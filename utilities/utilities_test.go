package utilities

import (
	"os"
	"path/filepath"
	"testing"
)

// ---------------------------------------------------------------------------
// CopyFile
// ---------------------------------------------------------------------------

func TestCopyFile_Basic(t *testing.T) {
	tmpDir := t.TempDir()
	srcPath := filepath.Join(tmpDir, "source.txt")
	dstPath := filepath.Join(tmpDir, "dest.txt")

	content := []byte("hello world")
	if err := os.WriteFile(srcPath, content, 0644); err != nil {
		t.Fatalf("failed to write source file: %v", err)
	}

	if err := CopyFile(srcPath, dstPath); err != nil {
		t.Fatalf("CopyFile failed: %v", err)
	}

	got, err := os.ReadFile(dstPath)
	if err != nil {
		t.Fatalf("failed to read dest file: %v", err)
	}
	if string(got) != string(content) {
		t.Errorf("copied content = %q; want %q", string(got), string(content))
	}
}

func TestCopyFile_EmptyFile(t *testing.T) {
	tmpDir := t.TempDir()
	srcPath := filepath.Join(tmpDir, "empty.txt")
	dstPath := filepath.Join(tmpDir, "empty_copy.txt")

	if err := os.WriteFile(srcPath, []byte{}, 0644); err != nil {
		t.Fatalf("failed to write source file: %v", err)
	}

	if err := CopyFile(srcPath, dstPath); err != nil {
		t.Fatalf("CopyFile failed: %v", err)
	}

	info, err := os.Stat(dstPath)
	if err != nil {
		t.Fatalf("failed to stat dest file: %v", err)
	}
	if info.Size() != 0 {
		t.Errorf("expected empty file, got size %d", info.Size())
	}
}

func TestCopyFile_LargeFile(t *testing.T) {
	tmpDir := t.TempDir()
	srcPath := filepath.Join(tmpDir, "large.bin")
	dstPath := filepath.Join(tmpDir, "large_copy.bin")

	// Create a 1MB file
	content := make([]byte, 1024*1024)
	for i := range content {
		content[i] = byte(i % 256)
	}
	if err := os.WriteFile(srcPath, content, 0644); err != nil {
		t.Fatalf("failed to write source file: %v", err)
	}

	if err := CopyFile(srcPath, dstPath); err != nil {
		t.Fatalf("CopyFile failed: %v", err)
	}

	got, err := os.ReadFile(dstPath)
	if err != nil {
		t.Fatalf("failed to read dest file: %v", err)
	}
	if len(got) != len(content) {
		t.Errorf("copied file size = %d; want %d", len(got), len(content))
	}
}

func TestCopyFile_NonexistentSource(t *testing.T) {
	tmpDir := t.TempDir()
	err := CopyFile(filepath.Join(tmpDir, "nonexistent.txt"), filepath.Join(tmpDir, "dest.txt"))
	if err == nil {
		t.Error("expected error when source does not exist")
	}
}

func TestCopyFile_OverwritesExisting(t *testing.T) {
	tmpDir := t.TempDir()
	srcPath := filepath.Join(tmpDir, "src.txt")
	dstPath := filepath.Join(tmpDir, "dst.txt")

	// Write original dest
	if err := os.WriteFile(dstPath, []byte("old content"), 0644); err != nil {
		t.Fatalf("failed to write dest file: %v", err)
	}

	// Write source with new content
	if err := os.WriteFile(srcPath, []byte("new content"), 0644); err != nil {
		t.Fatalf("failed to write source file: %v", err)
	}

	if err := CopyFile(srcPath, dstPath); err != nil {
		t.Fatalf("CopyFile failed: %v", err)
	}

	got, err := os.ReadFile(dstPath)
	if err != nil {
		t.Fatalf("failed to read dest file: %v", err)
	}
	if string(got) != "new content" {
		t.Errorf("dest content = %q; want \"new content\"", string(got))
	}
}

// ---------------------------------------------------------------------------
// CopyDir
// ---------------------------------------------------------------------------

func TestCopyDir_Basic(t *testing.T) {
	tmpDir := t.TempDir()
	srcDir := filepath.Join(tmpDir, "src")
	dstDir := filepath.Join(tmpDir, "dst")

	// Create source structure
	if err := os.MkdirAll(srcDir, 0755); err != nil {
		t.Fatalf("failed to create src dir: %v", err)
	}
	if err := os.WriteFile(filepath.Join(srcDir, "file.txt"), []byte("hello"), 0644); err != nil {
		t.Fatalf("failed to write file: %v", err)
	}

	if err := CopyDir(srcDir, dstDir); err != nil {
		t.Fatalf("CopyDir failed: %v", err)
	}

	got, err := os.ReadFile(filepath.Join(dstDir, "file.txt"))
	if err != nil {
		t.Fatalf("failed to read copied file: %v", err)
	}
	if string(got) != "hello" {
		t.Errorf("copied content = %q; want \"hello\"", string(got))
	}
}

func TestCopyDir_Nested(t *testing.T) {
	tmpDir := t.TempDir()
	srcDir := filepath.Join(tmpDir, "src")
	dstDir := filepath.Join(tmpDir, "dst")

	// Create nested structure
	nestedDir := filepath.Join(srcDir, "sub", "deep")
	if err := os.MkdirAll(nestedDir, 0755); err != nil {
		t.Fatalf("failed to create nested dirs: %v", err)
	}
	if err := os.WriteFile(filepath.Join(nestedDir, "deep.txt"), []byte("deep content"), 0644); err != nil {
		t.Fatalf("failed to write deep file: %v", err)
	}
	if err := os.WriteFile(filepath.Join(srcDir, "root.txt"), []byte("root content"), 0644); err != nil {
		t.Fatalf("failed to write root file: %v", err)
	}

	if err := CopyDir(srcDir, dstDir); err != nil {
		t.Fatalf("CopyDir failed: %v", err)
	}

	// Check root file
	got, err := os.ReadFile(filepath.Join(dstDir, "root.txt"))
	if err != nil {
		t.Fatalf("failed to read root file: %v", err)
	}
	if string(got) != "root content" {
		t.Errorf("root content = %q; want \"root content\"", string(got))
	}

	// Check deep nested file
	got, err = os.ReadFile(filepath.Join(dstDir, "sub", "deep", "deep.txt"))
	if err != nil {
		t.Fatalf("failed to read deep file: %v", err)
	}
	if string(got) != "deep content" {
		t.Errorf("deep content = %q; want \"deep content\"", string(got))
	}
}

func TestCopyDir_EmptyDirectory(t *testing.T) {
	tmpDir := t.TempDir()
	srcDir := filepath.Join(tmpDir, "empty_src")
	dstDir := filepath.Join(tmpDir, "empty_dst")

	if err := os.MkdirAll(srcDir, 0755); err != nil {
		t.Fatalf("failed to create src dir: %v", err)
	}

	if err := CopyDir(srcDir, dstDir); err != nil {
		t.Fatalf("CopyDir failed: %v", err)
	}

	info, err := os.Stat(dstDir)
	if err != nil {
		t.Fatalf("dest dir does not exist: %v", err)
	}
	if !info.IsDir() {
		t.Error("dest should be a directory")
	}
}

func TestCopyDir_NonexistentSource(t *testing.T) {
	tmpDir := t.TempDir()
	err := CopyDir(filepath.Join(tmpDir, "nonexistent"), filepath.Join(tmpDir, "dst"))
	if err == nil {
		t.Error("expected error when source directory does not exist")
	}
}

func TestCopyDir_MultipleFiles(t *testing.T) {
	tmpDir := t.TempDir()
	srcDir := filepath.Join(tmpDir, "src")
	dstDir := filepath.Join(tmpDir, "dst")

	if err := os.MkdirAll(srcDir, 0755); err != nil {
		t.Fatalf("failed to create src dir: %v", err)
	}

	files := map[string]string{
		"a.txt":  "content a",
		"b.txt":  "content b",
		"c.html": "<p>html</p>",
	}
	for name, content := range files {
		if err := os.WriteFile(filepath.Join(srcDir, name), []byte(content), 0644); err != nil {
			t.Fatalf("failed to write %s: %v", name, err)
		}
	}

	if err := CopyDir(srcDir, dstDir); err != nil {
		t.Fatalf("CopyDir failed: %v", err)
	}

	for name, expected := range files {
		got, err := os.ReadFile(filepath.Join(dstDir, name))
		if err != nil {
			t.Errorf("failed to read %s: %v", name, err)
			continue
		}
		if string(got) != expected {
			t.Errorf("%s content = %q; want %q", name, string(got), expected)
		}
	}
}
