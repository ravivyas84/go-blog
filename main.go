package main

import (
	"bytes"
	"fmt"
	"html/template"
	"log"
	"os"
	"path/filepath"
	"time"

	"blog/frontmatter"

	"github.com/yuin/goldmark"
	"gopkg.in/yaml.v2"
)

type Document struct {
	FrontMatter frontmatter.FrontMatter
	Content     template.HTML
}

func main() {
	// Create the build directory if it doesn't exist
	buildDir := "build"
	if err := os.MkdirAll(buildDir, 0755); err != nil {
		log.Fatalf("error creating build directory: %v", err)
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

		fmt.Printf("Processed file %s, output %s\n", file.Name(), outputPath)
	}
}
