package main

import (
	"bytes"
	"encoding/xml"
	"fmt"
	"html/template"
	"log"
	"os"
	"path/filepath"
	"time"

	"blog/frontmatter"
	"blog/utilities"

	"github.com/yuin/goldmark"
	"gopkg.in/yaml.v2"

	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

type Document struct {
	FrontMatter frontmatter.FrontMatter
	Content     template.HTML
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

		// Parse date from front matter
		parsedDate, err := time.Parse("2006-01-02", fm.Date)
		if err != nil {
			log.Printf("error parsing date from front matter for file %s: %v", file.Name(), err)
			continue
		}

		// Generate output path based on date
		outputPath := filepath.Join(buildDir, fmt.Sprintf("%d/%02d/%02d", parsedDate.Year(), parsedDate.Month(), parsedDate.Day()), "index.html")

		// Create output directory if it doesn't exist
		outputDir := filepath.Dir(outputPath)
		if err := os.MkdirAll(outputDir, 0755); err != nil {
			log.Printf("error creating output directory %s: %v", outputDir, err)
			continue
		}

		// Create and execute template
		doc := Document{
			FrontMatter: fm,
			Content:     template.HTML(buf.String()),
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
			log.Printf("error executing template for file %s: %v", file.Name(), err)
			continue
		}

		// Insert post data into the SQLite database
		_, err = db.Exec("INSERT INTO posts (title, content, pub_date) VALUES (?, ?, ?)",
			fm.Title, buf.String(), fm.Date)
		if err != nil {
			log.Printf("error inserting post data into database for file %s: %v", filePath, err)
			continue
		}

		// Add to RSS items
		rss.Channel.Items = append(rss.Channel.Items, Item{
			Title:       fm.Title,
			Link:        "http://yourblog.com/" + outputPath,
			Description: string(buf.Bytes()),
			PubDate:     parsedDate.Format(time.RFC1123Z),
		})

		fmt.Printf("Processed file %s, output %s\n", file.Name(), outputPath)
	}

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
			pub_date TEXT
	);`

	_, err = db.Exec(createTableSQL)
	if err != nil {
		return nil, fmt.Errorf("error creating posts table: %v", err)
	}

	return db, nil
}
