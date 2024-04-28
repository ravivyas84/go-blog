package main

import (
	"bytes"
	"html/template"
	"log"
	"os"

	"blog/frontmatter"

	"github.com/yuin/goldmark"
	"gopkg.in/yaml.v2"
)

type Document struct {
	FrontMatter frontmatter.FrontMatter
	Content     template.HTML
}

func main() {
	data, err := os.ReadFile("sample.md")
	if err != nil {
		log.Fatalf("error reading file: %v", err)
	}

	parts := bytes.SplitN(data, []byte("---"), 3)
	var fm frontmatter.FrontMatter
	if err := yaml.Unmarshal(parts[1], &fm); err != nil {
		log.Fatalf("error parsing frontmatter: %v", err)
	}

	var buf bytes.Buffer
	if err := goldmark.Convert(parts[2], &buf); err != nil {
		log.Fatalf("error converting markdown to HTML: %v", err)
	}

	tmpl, err := template.New("base.tmpl").ParseFiles("footer.tmpl", "header.tmpl", "content.tmpl", "base.tmpl")
	if err != nil {
		log.Fatalf("error parsing template files: %v", err)
	}

	tmpl = template.Must(tmpl.ParseGlob("*.tmpl"))

	doc := Document{
		FrontMatter: fm,
		Content:     template.HTML(buf.String()),
	}

	var outputBuf bytes.Buffer
	if err := tmpl.ExecuteTemplate(&outputBuf, "base.tmpl", doc); err != nil {
		log.Fatalf("error executing template: %v", err)
	}

	if err := os.WriteFile("output.html", outputBuf.Bytes(), 0644); err != nil {
		log.Fatalf("error writing output file: %v", err)
	}
}
