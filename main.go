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
	"strings"
	"time"

	"blog/frontmatter"
	"blog/utilities"

	"github.com/yuin/goldmark"
	"golang.org/x/net/html"
	"gopkg.in/yaml.v2"

	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

type Document struct {
	FrontMatter frontmatter.FrontMatter
	Content     template.HTML
	Headings    []string
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

		// Extract headings from the HTML content
		htmlContent := buf.String()
		headings := extractHeadings(htmlContent)

		// Convert headings to JSON
		headingsJSON, err := json.Marshal(headings)
		log.Printf("headings to JSON: %s", headingsJSON)

		if err != nil {
			log.Printf("error marshalling headings to JSON: %v", err)
			continue
		}

		// Insert post data into the SQLite database
		_, err = db.Exec("INSERT INTO posts (title, content, pub_date, headings) VALUES (?, ?, ?, ?)",
			fm.Title, buf.String(), fm.Date, headingsJSON)
		if err != nil {
			log.Printf("error inserting post data into database for file %s: %v", filePath, err)
			continue
		}

		fmt.Printf("Processed file %s\n", file.Name())
	}

	// Generate pages from database
	generatePagesFromDB(db, buildDir)

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
            headings TEXT NULL
	);`

	_, err = db.Exec(createTableSQL)
	if err != nil {
		return nil, fmt.Errorf("error creating posts table: %v", err)
	}

	return db, nil
}

func generatePagesFromDB(db *sql.DB, buildDir string) {
	rows, err := db.Query("SELECT title, content, pub_date, headings FROM posts")
	if err != nil {
		log.Fatalf("error querying posts from database: %v", err)
	}
	defer rows.Close()

	for rows.Next() {
		var title, content, pubDate, headingsJSON string
		err := rows.Scan(&title, &content, &pubDate, &headingsJSON)
		if err != nil {
			log.Printf("error scanning post data: %v", err)
			continue
		}

		// Parse date from front matter
		parsedDate, err := time.Parse("2006-01-02", pubDate)
		if err != nil {
			log.Printf("error parsing date from front matter for file %s: %v", title, err)
			continue
		}

		// Parse headings JSON
		var headings []string
		err = json.Unmarshal([]byte(headingsJSON), &headings)
		if err != nil {
			log.Printf("error unmarshalling headings from JSON: %v", err)
			continue
		}

		// Print the unmarshalled headings
		fmt.Printf("Unmarshalled headings for post '%s'::::::: %v\n", title, headings)

		// Generate output path based on date
		outputPath := filepath.Join(buildDir, fmt.Sprintf("%d/%02d/%02d", parsedDate.Year(), parsedDate.Month(), parsedDate.Day()), "index.html")

		// Create output directory if it doesn't exist
		outputDir := filepath.Dir(outputPath)
		if err := os.MkdirAll(outputDir, 0755); err != nil {
			log.Printf("error creating output directory %s: %v", outputDir, err)
			continue
		}

		doc := Document{
			FrontMatter: frontmatter.FrontMatter{Title: title, Date: pubDate},
			Content:     template.HTML(content),
			Headings:    headings,
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
