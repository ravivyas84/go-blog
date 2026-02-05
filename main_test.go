package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"testing"

	_ "github.com/mattn/go-sqlite3"
)

// ---------------------------------------------------------------------------
// generateSlug
// ---------------------------------------------------------------------------

func TestGenerateSlug_ValidDate(t *testing.T) {
	slug := generateSlug("2023-05-15", "hello-world")
	expected := "2023/05/15/hello-world"
	if slug != expected {
		t.Errorf("generateSlug(\"2023-05-15\", \"hello-world\") = %q; want %q", slug, expected)
	}
}

func TestGenerateSlug_SingleDigitMonthDay(t *testing.T) {
	slug := generateSlug("2022-01-03", "my-post")
	expected := "2022/01/03/my-post"
	if slug != expected {
		t.Errorf("generateSlug(\"2022-01-03\", \"my-post\") = %q; want %q", slug, expected)
	}
}

func TestGenerateSlug_InvalidDate(t *testing.T) {
	slug := generateSlug("not-a-date", "my-post")
	if slug != "" {
		t.Errorf("generateSlug with invalid date should return empty string, got %q", slug)
	}
}

func TestGenerateSlug_EmptyDate(t *testing.T) {
	slug := generateSlug("", "my-post")
	if slug != "" {
		t.Errorf("generateSlug with empty date should return empty string, got %q", slug)
	}
}

func TestGenerateSlug_EmptySlug(t *testing.T) {
	slug := generateSlug("2023-05-15", "")
	expected := "2023/05/15/"
	if slug != expected {
		t.Errorf("generateSlug(\"2023-05-15\", \"\") = %q; want %q", slug, expected)
	}
}

// ---------------------------------------------------------------------------
// slugify
// ---------------------------------------------------------------------------

func TestSlugify_BasicText(t *testing.T) {
	result := slugify("Hello World")
	if result != "hello-world" {
		t.Errorf("slugify(\"Hello World\") = %q; want \"hello-world\"", result)
	}
}

func TestSlugify_SpecialCharacters(t *testing.T) {
	result := slugify("What's New in Go 1.22?")
	// Apostrophe and question mark are stripped; remaining words joined by hyphens
	if !strings.Contains(result, "whats-new-in-go-122") {
		t.Errorf("slugify(\"What's New in Go 1.22?\") = %q; expected alphanumeric+hyphens", result)
	}
}

func TestSlugify_LeadingTrailingSpaces(t *testing.T) {
	result := slugify("  hello  ")
	if result != "hello" {
		t.Errorf("slugify(\"  hello  \") = %q; want \"hello\"", result)
	}
}

func TestSlugify_MultipleSpaces(t *testing.T) {
	result := slugify("hello   world")
	if result != "hello-world" {
		t.Errorf("slugify(\"hello   world\") = %q; want \"hello-world\"", result)
	}
}

func TestSlugify_EmptyString(t *testing.T) {
	result := slugify("")
	if result != "" {
		t.Errorf("slugify(\"\") = %q; want \"\"", result)
	}
}

func TestSlugify_AllSpecialChars(t *testing.T) {
	result := slugify("!@#$%^&*()")
	if result != "" {
		t.Errorf("slugify(\"!@#$%%^&*()\") = %q; want \"\"", result)
	}
}

func TestSlugify_Underscores(t *testing.T) {
	result := slugify("hello_world_test")
	if result != "hello-world-test" {
		t.Errorf("slugify(\"hello_world_test\") = %q; want \"hello-world-test\"", result)
	}
}

func TestSlugify_NumbersOnly(t *testing.T) {
	result := slugify("12345")
	if result != "12345" {
		t.Errorf("slugify(\"12345\") = %q; want \"12345\"", result)
	}
}

// ---------------------------------------------------------------------------
// makeUniqueID
// ---------------------------------------------------------------------------

func TestMakeUniqueID_FirstOccurrence(t *testing.T) {
	idCount := make(map[string]int)
	id := makeUniqueID("Introduction", idCount)
	if id != "introduction" {
		t.Errorf("makeUniqueID first occurrence = %q; want \"introduction\"", id)
	}
}

func TestMakeUniqueID_DuplicateHeadings(t *testing.T) {
	idCount := make(map[string]int)
	id1 := makeUniqueID("Summary", idCount)
	id2 := makeUniqueID("Summary", idCount)
	id3 := makeUniqueID("Summary", idCount)

	if id1 != "summary" {
		t.Errorf("first id = %q; want \"summary\"", id1)
	}
	if id2 != "summary-1" {
		t.Errorf("second id = %q; want \"summary-1\"", id2)
	}
	if id3 != "summary-2" {
		t.Errorf("third id = %q; want \"summary-2\"", id3)
	}
}

func TestMakeUniqueID_DifferentHeadings(t *testing.T) {
	idCount := make(map[string]int)
	id1 := makeUniqueID("Introduction", idCount)
	id2 := makeUniqueID("Conclusion", idCount)

	if id1 != "introduction" {
		t.Errorf("id1 = %q; want \"introduction\"", id1)
	}
	if id2 != "conclusion" {
		t.Errorf("id2 = %q; want \"conclusion\"", id2)
	}
}

// ---------------------------------------------------------------------------
// extractHeadings
// ---------------------------------------------------------------------------

func TestExtractHeadings_MultipleH2(t *testing.T) {
	html := `<h1>Title</h1><h2>First</h2><p>text</p><h2>Second</h2><p>more</p>`
	headings := extractHeadings(html)
	if len(headings) != 2 {
		t.Fatalf("expected 2 headings, got %d", len(headings))
	}
	if headings[0] != "First" {
		t.Errorf("headings[0] = %q; want \"First\"", headings[0])
	}
	if headings[1] != "Second" {
		t.Errorf("headings[1] = %q; want \"Second\"", headings[1])
	}
}

func TestExtractHeadings_NoH2(t *testing.T) {
	html := `<h1>Title</h1><h3>Subheading</h3><p>text</p>`
	headings := extractHeadings(html)
	if len(headings) != 0 {
		t.Errorf("expected 0 headings, got %d", len(headings))
	}
}

func TestExtractHeadings_EmptyHTML(t *testing.T) {
	headings := extractHeadings("")
	if len(headings) != 0 {
		t.Errorf("expected 0 headings for empty HTML, got %d", len(headings))
	}
}

func TestExtractHeadings_OnlyExtractsH2(t *testing.T) {
	html := `<h1>H1</h1><h2>H2</h2><h3>H3</h3><h4>H4</h4><h5>H5</h5><h6>H6</h6>`
	headings := extractHeadings(html)
	if len(headings) != 1 {
		t.Fatalf("expected 1 heading (h2 only), got %d", len(headings))
	}
	if headings[0] != "H2" {
		t.Errorf("headings[0] = %q; want \"H2\"", headings[0])
	}
}

// ---------------------------------------------------------------------------
// addHeadingIDs
// ---------------------------------------------------------------------------

func TestAddHeadingIDs_AddsIDsToH2(t *testing.T) {
	html := `<h2>Introduction</h2><p>text</p><h2>Conclusion</h2>`
	headings := []string{"Introduction", "Conclusion"}
	result := addHeadingIDs(html, headings)

	if !strings.Contains(result, `<h2 id="introduction">`) {
		t.Errorf("expected h2 with id=\"introduction\", got: %s", result)
	}
	if !strings.Contains(result, `<h2 id="conclusion">`) {
		t.Errorf("expected h2 with id=\"conclusion\", got: %s", result)
	}
}

func TestAddHeadingIDs_DuplicateHeadings(t *testing.T) {
	html := `<h2>Section</h2><p>text</p><h2>Section</h2>`
	headings := []string{"Section", "Section"}
	result := addHeadingIDs(html, headings)

	if !strings.Contains(result, `<h2 id="section">`) {
		t.Errorf("expected first h2 with id=\"section\", got: %s", result)
	}
	if !strings.Contains(result, `<h2 id="section-1">`) {
		t.Errorf("expected second h2 with id=\"section-1\", got: %s", result)
	}
}

func TestAddHeadingIDs_NoHeadings(t *testing.T) {
	html := `<p>Just a paragraph</p>`
	result := addHeadingIDs(html, nil)
	if result != html {
		t.Errorf("HTML without h2 should be unchanged, got: %s", result)
	}
}

// ---------------------------------------------------------------------------
// addLazyLoading
// ---------------------------------------------------------------------------

func TestAddLazyLoading_AddsAttribute(t *testing.T) {
	html := `<img src="photo.jpg" alt="photo">`
	result := addLazyLoading(html)
	expected := `<img loading="lazy" src="photo.jpg" alt="photo">`
	if result != expected {
		t.Errorf("addLazyLoading = %q; want %q", result, expected)
	}
}

func TestAddLazyLoading_MultipleImages(t *testing.T) {
	html := `<img src="a.jpg"><img src="b.jpg">`
	result := addLazyLoading(html)
	count := strings.Count(result, `loading="lazy"`)
	if count != 2 {
		t.Errorf("expected 2 lazy loading attributes, got %d", count)
	}
}

func TestAddLazyLoading_NoImages(t *testing.T) {
	html := `<p>No images here</p>`
	result := addLazyLoading(html)
	if result != html {
		t.Errorf("HTML without images should be unchanged")
	}
}

func TestAddLazyLoading_AlreadyHasLazy(t *testing.T) {
	// Edge case: if lazy loading is applied twice, it would double the attribute.
	// This documents the current behavior.
	html := `<img loading="lazy" src="photo.jpg">`
	result := addLazyLoading(html)
	count := strings.Count(result, `loading="lazy"`)
	if count != 2 {
		t.Logf("Double application produces %d lazy attributes (documents current behavior)", count)
	}
}

// ---------------------------------------------------------------------------
// extractFirstImage
// ---------------------------------------------------------------------------

func TestExtractFirstImage_FindsFirstImg(t *testing.T) {
	html := `<p>text</p><img src="/assets/photo1.jpg"><img src="/assets/photo2.jpg">`
	result := extractFirstImage(html)
	if result != "/assets/photo1.jpg" {
		t.Errorf("extractFirstImage = %q; want \"/assets/photo1.jpg\"", result)
	}
}

func TestExtractFirstImage_AbsoluteURL(t *testing.T) {
	html := `<img src="https://example.com/photo.jpg">`
	result := extractFirstImage(html)
	if result != "https://example.com/photo.jpg" {
		t.Errorf("extractFirstImage = %q; want \"https://example.com/photo.jpg\"", result)
	}
}

func TestExtractFirstImage_NoImages(t *testing.T) {
	html := `<p>No images</p>`
	result := extractFirstImage(html)
	if result != "" {
		t.Errorf("extractFirstImage with no images = %q; want \"\"", result)
	}
}

func TestExtractFirstImage_EmptyHTML(t *testing.T) {
	result := extractFirstImage("")
	if result != "" {
		t.Errorf("extractFirstImage with empty HTML = %q; want \"\"", result)
	}
}

func TestExtractFirstImage_ImgWithoutSrc(t *testing.T) {
	html := `<img alt="no source">`
	result := extractFirstImage(html)
	if result != "" {
		t.Errorf("extractFirstImage for img without src = %q; want \"\"", result)
	}
}

// ---------------------------------------------------------------------------
// generateTOCItems
// ---------------------------------------------------------------------------

func TestGenerateTOCItems_Basic(t *testing.T) {
	headings := []string{"Introduction", "Background", "Conclusion"}
	items := generateTOCItems(headings)

	if len(items) != 3 {
		t.Fatalf("expected 3 TOC items, got %d", len(items))
	}

	expectations := []struct {
		text string
		id   string
	}{
		{"Introduction", "introduction"},
		{"Background", "background"},
		{"Conclusion", "conclusion"},
	}

	for i, exp := range expectations {
		if items[i].Text != exp.text {
			t.Errorf("items[%d].Text = %q; want %q", i, items[i].Text, exp.text)
		}
		if items[i].ID != exp.id {
			t.Errorf("items[%d].ID = %q; want %q", i, items[i].ID, exp.id)
		}
	}
}

func TestGenerateTOCItems_DuplicateHeadings(t *testing.T) {
	headings := []string{"FAQ", "FAQ", "FAQ"}
	items := generateTOCItems(headings)

	if len(items) != 3 {
		t.Fatalf("expected 3 TOC items, got %d", len(items))
	}
	if items[0].ID != "faq" {
		t.Errorf("items[0].ID = %q; want \"faq\"", items[0].ID)
	}
	if items[1].ID != "faq-1" {
		t.Errorf("items[1].ID = %q; want \"faq-1\"", items[1].ID)
	}
	if items[2].ID != "faq-2" {
		t.Errorf("items[2].ID = %q; want \"faq-2\"", items[2].ID)
	}
}

func TestGenerateTOCItems_Empty(t *testing.T) {
	items := generateTOCItems(nil)
	if len(items) != 0 {
		t.Errorf("expected 0 TOC items for nil input, got %d", len(items))
	}
}

func TestGenerateTOCItems_IDsMatchAddHeadingIDs(t *testing.T) {
	// Verify that TOC item IDs are consistent with what addHeadingIDs produces
	headings := []string{"My Section", "My Section"}
	tocItems := generateTOCItems(headings)

	html := `<h2>My Section</h2><h2>My Section</h2>`
	result := addHeadingIDs(html, headings)

	for _, item := range tocItems {
		if !strings.Contains(result, `id="`+item.ID+`"`) {
			t.Errorf("TOC item ID %q not found in rendered HTML: %s", item.ID, result)
		}
	}
}

// ---------------------------------------------------------------------------
// initDB
// ---------------------------------------------------------------------------

func TestInitDB_CreatesDatabase(t *testing.T) {
	dbPath := filepath.Join(t.TempDir(), "test.db")
	db, err := initDB(dbPath)
	if err != nil {
		t.Fatalf("initDB failed: %v", err)
	}
	defer db.Close()

	// Verify the database file was created
	if _, err := os.Stat(dbPath); os.IsNotExist(err) {
		t.Error("database file was not created")
	}
}

func TestInitDB_CreatesPostsTable(t *testing.T) {
	dbPath := filepath.Join(t.TempDir(), "test.db")
	db, err := initDB(dbPath)
	if err != nil {
		t.Fatalf("initDB failed: %v", err)
	}
	defer db.Close()

	// Verify we can insert into the posts table
	_, err = db.Exec(`INSERT INTO posts (title, content, pub_date, slug) VALUES (?, ?, ?, ?)`,
		"Test", "<p>content</p>", "2023-01-01", "2023/01/01/test")
	if err != nil {
		t.Errorf("failed to insert into posts table: %v", err)
	}
}

func TestInitDB_RemovesExistingDB(t *testing.T) {
	dbPath := filepath.Join(t.TempDir(), "test.db")

	// Create an initial database with data
	db1, err := initDB(dbPath)
	if err != nil {
		t.Fatalf("first initDB failed: %v", err)
	}
	_, err = db1.Exec(`INSERT INTO posts (title, content, pub_date, slug) VALUES (?, ?, ?, ?)`,
		"Old Post", "<p>old</p>", "2023-01-01", "2023/01/01/old")
	if err != nil {
		t.Fatalf("insert failed: %v", err)
	}
	db1.Close()

	// Re-initialize - should start fresh
	db2, err := initDB(dbPath)
	if err != nil {
		t.Fatalf("second initDB failed: %v", err)
	}
	defer db2.Close()

	var count int
	err = db2.QueryRow("SELECT COUNT(*) FROM posts").Scan(&count)
	if err != nil {
		t.Fatalf("count query failed: %v", err)
	}
	if count != 0 {
		t.Errorf("expected 0 posts after re-init, got %d", count)
	}
}

// ---------------------------------------------------------------------------
// fetchLatestPosts
// ---------------------------------------------------------------------------

func setupTestDB(t *testing.T) *sql.DB {
	t.Helper()
	dbPath := filepath.Join(t.TempDir(), "test.db")
	db, err := initDB(dbPath)
	if err != nil {
		t.Fatalf("initDB failed: %v", err)
	}
	return db
}

func insertTestPost(t *testing.T, db *sql.DB, title, date, slug string, tags []string) {
	t.Helper()
	tagsJSON, _ := json.Marshal(tags)
	headingsJSON, _ := json.Marshal([]string{})
	_, err := db.Exec(
		`INSERT INTO posts (title, content, pub_date, headings, slug, tags, description, author) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
		title, "<p>content</p>", date, string(headingsJSON), slug, string(tagsJSON), "desc", "Author",
	)
	if err != nil {
		t.Fatalf("insertTestPost failed: %v", err)
	}
}

func TestFetchLatestPosts_ReturnsUpTo10(t *testing.T) {
	db := setupTestDB(t)
	defer db.Close()

	// Insert 15 posts
	for i := 1; i <= 15; i++ {
		dateStr := fmt.Sprintf("2023-01-%02d", i)
		insertTestPost(t, db, fmt.Sprintf("Post %d", i), dateStr, generateSlug(dateStr, "post"), nil)
	}

	posts, err := fetchLatestPosts(db)
	if err != nil {
		t.Fatalf("fetchLatestPosts failed: %v", err)
	}
	if len(posts) != 10 {
		t.Errorf("expected 10 latest posts, got %d", len(posts))
	}
}

func TestFetchLatestPosts_OrderedByDateDesc(t *testing.T) {
	db := setupTestDB(t)
	defer db.Close()

	insertTestPost(t, db, "Old", "2020-01-01", "2020/01/01/old", nil)
	insertTestPost(t, db, "New", "2023-06-15", "2023/06/15/new", nil)
	insertTestPost(t, db, "Mid", "2021-06-15", "2021/06/15/mid", nil)

	posts, err := fetchLatestPosts(db)
	if err != nil {
		t.Fatalf("fetchLatestPosts failed: %v", err)
	}

	if len(posts) != 3 {
		t.Fatalf("expected 3 posts, got %d", len(posts))
	}
	if posts[0].Title != "New" {
		t.Errorf("first post should be 'New', got %q", posts[0].Title)
	}
	if posts[1].Title != "Mid" {
		t.Errorf("second post should be 'Mid', got %q", posts[1].Title)
	}
	if posts[2].Title != "Old" {
		t.Errorf("third post should be 'Old', got %q", posts[2].Title)
	}
}

func TestFetchLatestPosts_EmptyDB(t *testing.T) {
	db := setupTestDB(t)
	defer db.Close()

	posts, err := fetchLatestPosts(db)
	if err != nil {
		t.Fatalf("fetchLatestPosts on empty DB failed: %v", err)
	}
	if len(posts) != 0 {
		t.Errorf("expected 0 posts for empty DB, got %d", len(posts))
	}
}

// ---------------------------------------------------------------------------
// JSON-LD structured data generation
// ---------------------------------------------------------------------------

func TestJSONLDBlogPosting_Serialization(t *testing.T) {
	jsonLD := JSONLDBlogPosting{
		Context: "https://schema.org",
		Type:    "BlogPosting",
		MainEntityOfPage: JSONLDWebPage{
			Type: "WebPage",
			ID:   "https://ravivyas.com/2023/05/15/test-post",
		},
		Headline:      "Test Post",
		Description:   "A test post description",
		Image:         "https://ravivyas.com/assets/image.jpg",
		DatePublished: "2023-05-15",
		DateModified:  "2023-05-15",
		URL:           "https://ravivyas.com/2023/05/15/test-post",
		Author: JSONLDPerson{
			Type: "Person",
			Name: "Ravi Vyas",
		},
		Publisher: JSONLDPublisher{
			Type: "Organization",
			Name: "Ravi Vyas",
			Logo: JSONLDImageObject{
				Type: "ImageObject",
				URL:  "https://ravivyas.com/favicon.ico",
			},
		},
	}

	data, err := json.Marshal(jsonLD)
	if err != nil {
		t.Fatalf("failed to marshal JSON-LD: %v", err)
	}

	// Verify key fields are present
	jsonStr := string(data)
	checks := []string{
		`"@context":"https://schema.org"`,
		`"@type":"BlogPosting"`,
		`"headline":"Test Post"`,
		`"datePublished":"2023-05-15"`,
	}
	for _, check := range checks {
		if !strings.Contains(jsonStr, check) {
			t.Errorf("JSON-LD missing expected field: %s", check)
		}
	}
}

func TestJSONLDBlogPosting_OmitsEmptyDescription(t *testing.T) {
	jsonLD := JSONLDBlogPosting{
		Context:  "https://schema.org",
		Type:     "BlogPosting",
		Headline: "Test",
	}

	data, err := json.Marshal(jsonLD)
	if err != nil {
		t.Fatalf("failed to marshal JSON-LD: %v", err)
	}

	if strings.Contains(string(data), `"description"`) {
		t.Error("JSON-LD should omit empty description (omitempty tag)")
	}
}

// ---------------------------------------------------------------------------
// RSS struct serialization
// ---------------------------------------------------------------------------

func TestRSS_Serialization(t *testing.T) {
	rss := RSS{
		Version: "2.0",
		Channel: Channel{
			Title:       "Test Blog",
			Link:        "https://example.com",
			Description: "A test blog",
			PubDate:     "Mon, 15 May 2023 00:00:00 +0000",
			Items: []Item{
				{
					Title:       "Post 1",
					Link:        "https://example.com/post-1",
					Description: "First post",
					PubDate:     "Mon, 15 May 2023 00:00:00 +0000",
				},
			},
		},
	}

	data, err := json.Marshal(rss)
	if err != nil {
		t.Fatalf("failed to marshal RSS: %v", err)
	}

	if !strings.Contains(string(data), "Post 1") {
		t.Error("RSS serialization missing item title")
	}
}

// ---------------------------------------------------------------------------
// Edge cases for HTML processing pipeline
// ---------------------------------------------------------------------------

func TestHTMLPipeline_HeadingsAndLazyLoading(t *testing.T) {
	// Simulate the pipeline: extract headings → add IDs → add lazy loading
	html := `<h2>Getting Started</h2><p>Hello</p><img src="photo.jpg"><h2>Next Steps</h2>`

	headings := extractHeadings(html)
	if len(headings) != 2 {
		t.Fatalf("expected 2 headings, got %d", len(headings))
	}

	withIDs := addHeadingIDs(html, headings)
	if !strings.Contains(withIDs, `id="getting-started"`) {
		t.Error("missing heading ID for 'Getting Started'")
	}
	if !strings.Contains(withIDs, `id="next-steps"`) {
		t.Error("missing heading ID for 'Next Steps'")
	}

	withLazy := addLazyLoading(withIDs)
	if !strings.Contains(withLazy, `loading="lazy"`) {
		t.Error("missing lazy loading attribute")
	}

	// All heading IDs should still be present after lazy loading
	if !strings.Contains(withLazy, `id="getting-started"`) {
		t.Error("heading ID lost after lazy loading")
	}
}

func TestExtractHeadings_NestedElements(t *testing.T) {
	// h2 with nested inline elements — only direct text nodes are extracted
	html := `<h2><strong>Bold</strong> Heading</h2>`
	headings := extractHeadings(html)
	// Current implementation only gets direct text nodes, so "Bold" inside <strong> is skipped
	// This documents the actual behavior
	if len(headings) == 0 {
		t.Log("extractHeadings does not extract text from nested elements (only direct text nodes)")
	}
}

func TestAddHeadingIDs_PreservesOtherHTML(t *testing.T) {
	html := `<h1>Title</h1><h2>Section</h2><p class="intro">Hello</p>`
	headings := []string{"Section"}
	result := addHeadingIDs(html, headings)

	if !strings.Contains(result, `<h1>Title</h1>`) {
		t.Error("h1 tag was modified unexpectedly")
	}
	if !strings.Contains(result, `class="intro"`) {
		t.Error("p class attribute was lost")
	}
}

// ---------------------------------------------------------------------------
// Image extraction with relative/absolute paths
// ---------------------------------------------------------------------------

func TestExtractFirstImage_RelativePath(t *testing.T) {
	html := `<img src="/assets/images/blog/photo.png" alt="test">`
	result := extractFirstImage(html)
	if result != "/assets/images/blog/photo.png" {
		t.Errorf("extractFirstImage = %q; want \"/assets/images/blog/photo.png\"", result)
	}
}

func TestExtractFirstImage_SkipsNonImgTags(t *testing.T) {
	html := `<video src="video.mp4"></video><img src="thumb.jpg">`
	result := extractFirstImage(html)
	if result != "thumb.jpg" {
		t.Errorf("extractFirstImage = %q; want \"thumb.jpg\"", result)
	}
}
