// seo/seo.go
package seo

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/net/html"
)

// InitializeSEOdb initializes the SEO database and creates the necessary table
func InitializeSEOdb(dbPath string) (*sql.DB, error) {
	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		return nil, fmt.Errorf("error opening database: %v", err)
	}

	createTableSQL := `CREATE TABLE IF NOT EXISTS seo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path TEXT,
        title TEXT,
        meta_description TEXT,
        links TEXT
    );`

	_, err = db.Exec(createTableSQL)
	if err != nil {
		return nil, fmt.Errorf("error creating SEO table: %v", err)
	}

	return db, nil
}

// CheckLinksInBuildDirectory goes through all HTML files in the build directory, extracts links, and checks if they are valid
func CheckLinksInBuildDirectory(db *sql.DB, buildDir string) {
	err := filepath.Walk(buildDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() && strings.HasSuffix(path, ".html") {
			checkLinksInFile(db, path)
		}
		return nil
	})

	if err != nil {
		log.Fatalf("error walking the path %s: %v", buildDir, err)
	}
}

// checkLinksInFile extracts links from an HTML file, checks their status, and inserts SEO metadata into the database
func checkLinksInFile(db *sql.DB, filePath string) {
	file, err := os.Open(filePath)
	if err != nil {
		log.Printf("error opening file %s: %v", filePath, err)
		return
	}
	defer file.Close()

	doc, err := html.Parse(file)
	if err != nil {
		log.Printf("error parsing HTML file %s: %v", filePath, err)
		return
	}

	title := extractTitle(doc)
	metaDescription := extractMetaDescription(doc)
	links := extractLinks(doc)
	validLinks := checkLinkStatuses(links)

	insertSEOData(db, filePath, title, metaDescription, validLinks)
}

// extractTitle extracts the title from an HTML document
func extractTitle(n *html.Node) string {
	var title string
	var f func(*html.Node)
	f = func(n *html.Node) {
		if n.Type == html.ElementNode && n.Data == "title" {
			if n.FirstChild != nil {
				title = n.FirstChild.Data
			}
		}
		for c := n.FirstChild; c != nil; c = c.NextSibling {
			f(c)
		}
	}
	f(n)
	return title
}

// extractMetaDescription extracts the meta description from an HTML document
func extractMetaDescription(n *html.Node) string {
	var metaDescription string
	var f func(*html.Node)
	f = func(n *html.Node) {
		if n.Type == html.ElementNode && n.Data == "meta" {
			for _, a := range n.Attr {
				if a.Key == "name" && a.Val == "description" {
					for _, a := range n.Attr {
						if a.Key == "content" {
							metaDescription = a.Val
						}
					}
				}
			}
		}
		for c := n.FirstChild; c != nil; c = c.NextSibling {
			f(c)
		}
	}
	f(n)
	return metaDescription
}

// extractLinks extracts all links from an HTML node
func extractLinks(n *html.Node) []string {
	var links []string
	var f func(*html.Node)
	f = func(n *html.Node) {
		if n.Type == html.ElementNode && n.Data == "a" {
			for _, a := range n.Attr {
				if a.Key == "href" {
					links = append(links, a.Val)
				}
			}
		}
		for c := n.FirstChild; c != nil; c = c.NextSibling {
			f(c)
		}
	}
	f(n)
	return links
}

// checkLinkStatuses checks the status of each link and returns a list of valid links
func checkLinkStatuses(links []string) []string {
	var validLinks []string
	for _, link := range links {
		if strings.HasPrefix(link, "http") || strings.HasPrefix(link, "https") {
			resp, err := http.Head(link)
			if err != nil {
				log.Printf("error checking link %s: %v", link, err)
				continue
			}
			if resp.StatusCode == http.StatusNotFound {
				log.Printf("link %s returned 404", link)
			} else {
				validLinks = append(validLinks, link)
			}
		}
	}
	return validLinks
}

// insertSEOData inserts SEO metadata into the database
func insertSEOData(db *sql.DB, path, title, metaDescription string, links []string) {
	linksStr := strings.Join(links, ", ")
	_, err := db.Exec("INSERT INTO seo (path, title, meta_description, links) VALUES (?, ?, ?, ?)",
		path, title, metaDescription, linksStr)
	if err != nil {
		log.Printf("error inserting SEO data for file %s: %v", path, err)
	}
}
