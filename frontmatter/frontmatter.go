
package frontmatter

// FrontMatter struct to hold the parsed frontmatter data
type FrontMatter struct {
    Template         string
    Title            string
    ShortDescription string
    Slug             string
    Author           string
    PublishDate      string
    Tags             []string
}
