package main

import (
	"bytes"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"html/template"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
	"time"

	"blog/frontmatter"
	"blog/utilities"

	"github.com/yuin/goldmark"
	goldmarkhtml "github.com/yuin/goldmark/renderer/html"
	"golang.org/x/net/html"
	"gopkg.in/yaml.v2"

	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

type HeadingWithID struct {
	Text string
	ID   string
}

type Document struct {
	FrontMatter frontmatter.FrontMatter
	Content     template.HTML
	Headings    []string
	TOCItems    []HeadingWithID
	JSONLD      template.HTML
}

// JSON-LD structured data types for schema.org BlogPosting
type JSONLDBlogPosting struct {
	Context          string          `json:"@context"`
	Type             string          `json:"@type"`
	MainEntityOfPage JSONLDWebPage   `json:"mainEntityOfPage"`
	Headline         string          `json:"headline"`
	Description      string          `json:"description,omitempty"`
	Image            string          `json:"image"`
	DatePublished    string          `json:"datePublished"`
	DateModified     string          `json:"dateModified"`
	URL              string          `json:"url"`
	Author           JSONLDPerson    `json:"author"`
	Publisher        JSONLDPublisher `json:"publisher"`
}

type JSONLDWebPage struct {
	Type string `json:"@type"`
	ID   string `json:"@id"`
}

type JSONLDPerson struct {
	Type string `json:"@type"`
	Name string `json:"name"`
}

type JSONLDPublisher struct {
	Type string `json:"@type"`
	Name string `json:"name"`
	Logo JSONLDImageObject `json:"logo"`
}

type JSONLDImageObject struct {
	Type string `json:"@type"`
	URL  string `json:"url"`
}

type LatestPosts struct {
	FrontMatter frontmatter.FrontMatter
	Content     template.HTML
	Latest      []Post
}

type Post struct {
	Title string
	Slug  string
	Date  time.Time
}

type RSS struct {
	XMLName xml.Name `xml:"rss"`
	Version string   `xml:"version,attr"`
	Channel Channel  `xml:"channel"`
}

type Channel struct {
	Title       string `xml:"title"`
	Link        string `xml:"link"`
	Description string `xml:"description"`
	PubDate     string `xml:"pubDate"`
	Items       []Item `xml:"item"`
}

type Item struct {
	Title       string `xml:"title"`
	Link        string `xml:"link"`
	Description string `xml:"description"`
	PubDate     string `xml:"pubDate"`
}

func main() {

	buildDir := "build"

	// Remove the existing build directory if it exists
	if err := os.RemoveAll(buildDir); err != nil {
		log.Fatalf("error removing build directory: %v", err)
	}

	// Create the build directory
	if err := os.MkdirAll(buildDir, 0755); err != nil {
		log.Fatalf("error creating build directory: %v", err)
	}

	log.Println("Build directory has been successfully recreated.")

	// Initialize the SQLite database
	db, err := initDB("posts.db")
	if err != nil {
		log.Fatalf("error initializing database: %v", err)
	}
	defer db.Close()

	// Initialize the RSS channel
	rss := RSS{
		Version: "2.0",
		Channel: Channel{
			Title:       "Your Blog Title",
			Link:        "http://yourblog.com",
			Description: "Your blog description",
			PubDate:     time.Now().Format(time.RFC1123Z),
			Items:       []Item{},
		},
	}

	// Read all files in the "posts" directory
	postsDir := "posts"
	files, err := os.ReadDir(postsDir)
	if err != nil {
		log.Fatalf("error reading posts directory: %v", err)
	}

	// Iterate over each file in the "posts" directory
	for _, file := range files {
		if file.IsDir() {
			continue // Skip directories
		}

		// Read the content of the file
		filePath := filepath.Join(postsDir, file.Name())
		data, err := os.ReadFile(filePath)
		if err != nil {
			log.Printf("error reading file %s: %v", file.Name(), err)
			continue
		}

		// Parse front matter and content
		parts := bytes.SplitN(data, []byte("---"), 3)
		var fm frontmatter.FrontMatter
		if err := yaml.Unmarshal(parts[1], &fm); err != nil {
			log.Printf("error parsing front matter for file %s: %v", file.Name(), err)
			continue
		}

		var buf bytes.Buffer
		if err := goldmark.Convert(parts[2], &buf); err != nil {
			log.Printf("error converting markdown to HTML for file %s: %v", file.Name(), err)
			continue
		}

		// Extract headings from the HTML content, add heading IDs, and add lazy loading to images
		htmlContent := buf.String()
		headings := extractHeadings(htmlContent)
		htmlContent = addHeadingIDs(htmlContent, headings)
		htmlContent = addLazyLoading(htmlContent)

		// Convert headings to JSON
		headingsJSON, err := json.Marshal(headings)
		// log.Printf("headings to JSON: %s", headingsJSON)
		if err != nil {
			log.Printf("error marshalling headings to JSON: %v", err)
			continue
		}

		// Convert tags to JSON
		tagsJSON, err := json.Marshal(fm.Tags)
		// log.Printf("tags to JSON: %s", tagsJSON)
		if err != nil {
			log.Printf("error marshalling tags to JSON: %v", err)
			continue
		}

		// Generate slug
		slug := generateSlug(fm.Date, fm.Slug)

		// Insert post data into the SQLite database
		_, err = db.Exec("INSERT INTO posts (title, content, pub_date, headings, slug, tags, description, author) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
			fm.Title, htmlContent, fm.Date, string(headingsJSON), slug, string(tagsJSON), fm.Description, fm.Author)
		if err != nil {
			log.Printf("error inserting post data into database for file %s: %v", filePath, err)
			continue
		}

		fmt.Printf("Processed file %s\n", file.Name())
	}

	// Generate pages from database
	generatePagesFromDB(db, buildDir)

	// Generate static
	buildPages(db)

	// Generate posts page from database
	listAllPosts(db, buildDir)

	// List all tags
	listAllTags(db, buildDir)

	// Serialize RSS to XML
	outputRSS, err := xml.MarshalIndent(rss, "", "  ")
	if err != nil {
		log.Fatalf("error marshalling RSS: %v", err)
	}
	err = os.WriteFile(filepath.Join(buildDir, "feed.xml"), outputRSS, 0644)
	if err != nil {
		log.Fatalf("error writing RSS file: %v", err)
	}

	src := "./public"
	dst := "./build/"

	copy_err := utilities.CopyDir(src, dst)
	if copy_err != nil {
		log.Fatalf("Failed to copy %s to %s: %s", src, dst, copy_err)
	}

	log.Printf("Successfully copied %s to %s", src, dst)
}

// Generate the slug
func generateSlug(dateStr, frontmatterSlug string) string {
	parsedDate, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		log.Printf("error parsing date: %v", err)
		return ""
	}
	slug := fmt.Sprintf("%d/%02d/%02d/%s", parsedDate.Year(), parsedDate.Month(), parsedDate.Day(), frontmatterSlug)
	return slug
}

func initDB(dbPath string) (*sql.DB, error) {
	// Check if the database file exists and remove it
	if _, err := os.Stat(dbPath); err == nil {
		err = os.Remove(dbPath)
		if err != nil {
			return nil, fmt.Errorf("error removing existing database: %v", err)
		}
	} else if !os.IsNotExist(err) {
		return nil, fmt.Errorf("error checking database file: %v", err)
	}

	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		return nil, fmt.Errorf("error opening database: %v", err)
	}

	createTableSQL := `CREATE TABLE IF NOT EXISTS posts (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT,
			content TEXT,
			pub_date TEXT,
			headings TEXT NULL,
			slug TEXT,
			tags TEXT NULL,
			description TEXT NULL,
			author TEXT NULL
	);`

	_, err = db.Exec(createTableSQL)
	if err != nil {
		return nil, fmt.Errorf("error creating posts table: %v", err)
	}

	return db, nil
}

func generatePagesFromDB(db *sql.DB, buildDir string) {
	rows, err := db.Query("SELECT title, content, pub_date, headings, slug, tags, description, author FROM posts")
	if err != nil {
		log.Fatalf("error querying posts from database: %v", err)
	}
	defer rows.Close()

	const siteURL = "https://ravivyas.com"
	const defaultAuthor = "Ravi Vyas"
	const faviconURL = siteURL + "/favicon.ico"

	for rows.Next() {
		var title, content, pubDate, headingsJSON, slug, tags, description, author string
		err := rows.Scan(&title, &content, &pubDate, &headingsJSON, &slug, &tags, &description, &author)
		if err != nil {
			log.Printf("error scanning post data: %v", err)
			continue
		}

		// Parse headings JSON
		var headings []string
		err = json.Unmarshal([]byte(headingsJSON), &headings)
		if err != nil {
			log.Printf("error unmarshalling headings from JSON: %v", err)
			continue
		}

		// Generate TOC items with IDs
		tocItems := generateTOCItems(headings)

		// Generate output path based on date
		outputPath := filepath.Join(buildDir, slug, "index.html")

		// Create output directory if it doesn't exist
		outputDir := filepath.Dir(outputPath)
		if err := os.MkdirAll(outputDir, 0755); err != nil {
			log.Printf("error creating output directory %s: %v", outputDir, err)
			continue
		}

		// Build JSON-LD structured data
		authorName := author
		if authorName == "" {
			authorName = defaultAuthor
		}

		postURL := siteURL + "/" + slug

		// Extract the first image from post content, fall back to favicon
		postImage := extractFirstImage(content)
		if postImage != "" && !strings.HasPrefix(postImage, "http") {
			postImage = siteURL + postImage
		}
		if postImage == "" {
			postImage = faviconURL
		}

		jsonLD := JSONLDBlogPosting{
			Context: "https://schema.org",
			Type:    "BlogPosting",
			MainEntityOfPage: JSONLDWebPage{
				Type: "WebPage",
				ID:   postURL,
			},
			Headline:      title,
			Description:   description,
			Image:         postImage,
			DatePublished: pubDate,
			DateModified:  pubDate,
			URL:           postURL,
			Author: JSONLDPerson{
				Type: "Person",
				Name: authorName,
			},
			Publisher: JSONLDPublisher{
				Type: "Organization",
				Name: defaultAuthor,
				Logo: JSONLDImageObject{
					Type: "ImageObject",
					URL:  faviconURL,
				},
			},
		}
		jsonLDBytes, err := json.MarshalIndent(jsonLD, "", "  ")
		if err != nil {
			log.Printf("error marshalling JSON-LD for '%s': %v", title, err)
		} else {
			log.Printf("JSON-LD for '%s':\n%s", title, string(jsonLDBytes))
		}

		doc := Document{
			FrontMatter: frontmatter.FrontMatter{Title: title, Date: pubDate, Description: description, Slug: slug},
			Content:     template.HTML(content),
			Headings:    headings,
			TOCItems:    tocItems,
			JSONLD:      template.HTML(fmt.Sprintf("<script type=\"application/ld+json\">\n%s\n</script>", string(jsonLDBytes))),
		}

		tmpl := template.New("base.tmpl")
		tmpl, err = tmpl.ParseFiles("footer.tmpl", "header.tmpl", "content.tmpl", "base.tmpl")
		if err != nil {
			log.Printf("error parsing template files: %v", err)
			continue
		}

		outputFile, err := os.Create(outputPath)
		if err != nil {
			log.Printf("error creating output file %s: %v", outputPath, err)
			continue
		}
		defer outputFile.Close()

		if err := tmpl.ExecuteTemplate(outputFile, "base.tmpl", doc); err != nil {
			log.Printf("error executing template for file %s: %v", outputPath, err)
			continue
		}

	}
}

func extractHeadings(htmlContent string) []string {
	var headings []string
	doc, err := html.Parse(strings.NewReader(htmlContent))
	if err != nil {
		log.Printf("error parsing HTML: %v", err)
		return headings
	}

	var f func(*html.Node)
	f = func(n *html.Node) {
		if n.Type == html.ElementNode && n.Data == "h2" {
			for c := n.FirstChild; c != nil; c = c.NextSibling {
				if c.Type == html.TextNode {
					headings = append(headings, c.Data)
				}
			}
		}
		for c := n.FirstChild; c != nil; c = c.NextSibling {
			f(c)
		}
	}
	f(doc)
	return headings
}

// addLazyLoading adds loading="lazy" to all <img> tags in the HTML content.
func addLazyLoading(htmlContent string) string {
	return strings.ReplaceAll(htmlContent, "<img ", `<img loading="lazy" `)
}

// extractFirstImage finds the first <img> tag in HTML content and returns its src attribute.
func extractFirstImage(htmlContent string) string {
	doc, err := html.Parse(strings.NewReader(htmlContent))
	if err != nil {
		return ""
	}

	var imgSrc string
	var f func(*html.Node)
	f = func(n *html.Node) {
		if imgSrc != "" {
			return
		}
		if n.Type == html.ElementNode && n.Data == "img" {
			for _, attr := range n.Attr {
				if attr.Key == "src" {
					imgSrc = attr.Val
					return
				}
			}
		}
		for c := n.FirstChild; c != nil; c = c.NextSibling {
			f(c)
		}
	}
	f(doc)
	return imgSrc
}

var h2OpenTagRegex = regexp.MustCompile(`<h2>`)

func slugify(text string) string {
	text = strings.ToLower(strings.TrimSpace(text))
	var result strings.Builder
	prevHyphen := false
	for _, r := range text {
		if (r >= 'a' && r <= 'z') || (r >= '0' && r <= '9') {
			result.WriteRune(r)
			prevHyphen = false
		} else if r == ' ' || r == '-' || r == '_' {
			if !prevHyphen {
				result.WriteRune('-')
				prevHyphen = true
			}
		}
	}
	return strings.Trim(result.String(), "-")
}

func makeUniqueID(text string, idCount map[string]int) string {
	baseID := slugify(text)
	id := baseID
	if count, exists := idCount[baseID]; exists && count > 0 {
		id = fmt.Sprintf("%s-%d", baseID, count)
	}
	idCount[baseID]++
	return id
}

func addHeadingIDs(htmlContent string, headings []string) string {
	idCount := make(map[string]int)
	i := 0
	return h2OpenTagRegex.ReplaceAllStringFunc(htmlContent, func(match string) string {
		if i < len(headings) {
			id := makeUniqueID(headings[i], idCount)
			i++
			return `<h2 id="` + id + `">`
		}
		return match
	})
}

func generateTOCItems(headings []string) []HeadingWithID {
	var items []HeadingWithID
	idCount := make(map[string]int)
	for _, h := range headings {
		id := makeUniqueID(h, idCount)
		items = append(items, HeadingWithID{Text: h, ID: id})
	}
	return items
}

func buildPages(db *sql.DB) {
	pagesDir := "pages"
	buildDir := "build"
	files, err := os.ReadDir(pagesDir)
	if err != nil {
		log.Fatalf("error reading pages directory: %v", err)
	}

	for _, file := range files {
		if file.IsDir() {
			continue // Skip directories
		}

		// Read the content of the file
		filePath := filepath.Join(pagesDir, file.Name())
		content, err := os.ReadFile(filePath)
		if err != nil {
			log.Printf("error reading file %s: %v", filePath, err)
			continue
		}

		// Parse front matter and content
		parts := bytes.SplitN(content, []byte("---"), 3)
		var fm frontmatter.FrontMatter
		if err := yaml.Unmarshal(parts[1], &fm); err != nil {
			log.Printf("error parsing front matter for file %s: %v", file.Name(), err)
			continue
		}
		log.Printf("Front matter SLug %s", fm.Slug)

		// Convert markdown to HTML (unsafe HTML allowed so pages can embed raw HTML)
		var buf bytes.Buffer
		mdParser := goldmark.New(goldmark.WithRendererOptions(goldmarkhtml.WithUnsafe()))
		if err := mdParser.Convert(parts[2], &buf); err != nil {
			log.Printf("error converting markdown for file %s: %v", filePath, err)
			continue
		}
		// Handle the index.md differently
		var latest_Posts []Post

		outputPath := filepath.Join(buildDir, file.Name())
		outputPath = strings.TrimSuffix(outputPath, filepath.Ext(outputPath)) + "/index.html"

		if file.Name() == "index.md" {
			outputPath = filepath.Join(buildDir, file.Name())
			outputPath = strings.TrimSuffix(outputPath, filepath.Ext(outputPath)) + ".html"
			latest_Posts, err = fetchLatestPosts(db)
			if err != nil {
				log.Printf("error fetching latest posts: %v", err)
				continue
			}
		}

		outputDir := filepath.Dir(outputPath)
		if err := os.MkdirAll(outputDir, 0755); err != nil {
			log.Printf("error creating output directory %s: %v", outputDir, err)
			continue
		}

		doc := LatestPosts{
			FrontMatter: fm,
			Content:     template.HTML(addLazyLoading(buf.String())),
			Latest:      latest_Posts,
		}

		tmpl := template.New("base.tmpl")
		tmpl, err = tmpl.ParseFiles("footer.tmpl", "header.tmpl", "pages.tmpl", "base.tmpl")
		if err != nil {
			log.Printf("error parsing template files: %v", err)
			continue
		}

		outputFile, err := os.Create(outputPath)
		if err != nil {
			log.Printf("error creating output file %s: %v", outputPath, err)
			continue
		}
		defer outputFile.Close()

		if err := tmpl.ExecuteTemplate(outputFile, "base.tmpl", doc); err != nil {
			log.Printf("error executing template for file %s: %v", outputPath, err)
			continue
		}

		fmt.Printf("Processed page %s, output %s\n", file.Name(), outputPath)
	}
}

func fetchLatestPosts(db *sql.DB) ([]Post, error) {
	rows, err := db.Query("SELECT title, slug, pub_date FROM posts ORDER BY pub_date DESC LIMIT 10")
	if err != nil {
		return nil, fmt.Errorf("error querying latest posts: %v", err)
	}
	defer rows.Close()

	var posts []Post
	for rows.Next() {
		var post Post
		var pubDate string
		err := rows.Scan(&post.Title, &post.Slug, &pubDate)
		if err != nil {
			return nil, fmt.Errorf("error scanning post data: %v", err)
		}

		post.Date, err = time.Parse("2006-01-02", pubDate)
		if err != nil {
			return nil, fmt.Errorf("error parsing date: %v", err)
		}

		posts = append(posts, post)
	}

	return posts, nil
}

func listAllPosts(db *sql.DB, buildDir string) {
	// Fetch all posts from the database
	rows, err := db.Query("SELECT title, slug, pub_date FROM posts ORDER BY pub_date DESC")
	if err != nil {
		log.Fatalf("error querying all posts: %v", err)
	}
	defer rows.Close()

	var posts []Post
	for rows.Next() {
		var post Post
		var pubDate string
		err := rows.Scan(&post.Title, &post.Slug, &pubDate)
		if err != nil {
			log.Printf("error scanning post data: %v", err)
			continue
		}

		post.Date, err = time.Parse("2006-01-02", pubDate)
		if err != nil {
			log.Printf("error parsing date: %v", err)
			continue
		}

		posts = append(posts, post)
	}

	// Generate the HTML for the list of all posts
	outputPath := filepath.Join(buildDir, "posts", "index.html")

	outputDir := filepath.Dir(outputPath)
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		log.Printf("error creating output directory %s: %v", outputDir, err)
		return
	}

	doc := struct {
		Title string
		Posts []Post
	}{
		Title: "Blog",
		Posts: posts,
	}

	tmpl := template.New("base_2.tmpl")
	tmpl, err = tmpl.ParseFiles("footer.tmpl", "header.tmpl", "posts.tmpl", "base_2.tmpl")
	if err != nil {
		log.Printf("error parsing template files: %v", err)
		return
	}

	outputFile, err := os.Create(outputPath)
	if err != nil {
		log.Printf("error creating output file %s: %v", outputPath, err)
		return
	}
	defer outputFile.Close()

	if err := tmpl.ExecuteTemplate(outputFile, "base_2.tmpl", doc); err != nil {
		log.Printf("error executing template for file %s: %v", outputPath, err)
		return
	}

	fmt.Printf("Processed all posts, output %s\n", outputPath)
}

func listAllTags(db *sql.DB, buildDir string) {
	// Fetch all tags from the database
	rows, err := db.Query("SELECT tags FROM posts")
	if err != nil {
		log.Fatalf("error querying all tags: %v", err)
	}
	defer rows.Close()

	tagCounts := make(map[string]int)
	for rows.Next() {
		var tagsJSON string
		err := rows.Scan(&tagsJSON)
		if err != nil {
			log.Printf("error scanning tags: %v", err)
			continue
		}

		var tags []string
		err = json.Unmarshal([]byte(tagsJSON), &tags)
		if err != nil {
			log.Printf("error unmarshalling tags from JSON: %v", err)
			continue
		}

		for _, tag := range tags {
			tagCounts[tag]++
		}
	}

	// Convert the tagCounts map to a slice of tags with counts
	type TagCount struct {
		Tag   string
		Count int
	}

	var tagCountList []TagCount
	for tag, count := range tagCounts {
		tagCountList = append(tagCountList, TagCount{Tag: tag, Count: count})
	}

	// Sort the tagCountList by count in descending order
	sort.Slice(tagCountList, func(i, j int) bool {
		return tagCountList[i].Count > tagCountList[j].Count
	})

	// Generate the HTML for the list of all tags
	outputPath := filepath.Join(buildDir, "tag", "index.html")

	outputDir := filepath.Dir(outputPath)
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		log.Printf("error creating output directory %s: %v", outputDir, err)
		return
	}

	doc := struct {
		Title string
		Tags  []TagCount
	}{
		Title: "Tags",
		Tags:  tagCountList,
	}

	tmpl := template.New("base_tags.tmpl")
	tmpl, err = tmpl.ParseFiles("footer.tmpl", "header.tmpl", "tags.tmpl", "base_tags.tmpl")
	if err != nil {
		log.Printf("error parsing template files: %v", err)
		return
	}

	outputFile, err := os.Create(outputPath)
	if err != nil {
		log.Printf("error creating output file %s: %v", outputPath, err)
		return
	}
	defer outputFile.Close()

	if err := tmpl.ExecuteTemplate(outputFile, "base_tags.tmpl", doc); err != nil {
		log.Printf("error executing template for file %s: %v", outputPath, err)
		return
	}

	fmt.Printf("Processed all tags, output %s\n", outputPath)
}
