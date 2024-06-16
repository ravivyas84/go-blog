package frontmatter

// FrontMatter struct to hold the parsed frontmatter data
type FrontMatter struct {
	Template         string
	Title            string
	Description      string
	Slug             string
	Author           string
	Date             string
	Tags             []string
}
