package webserver

import (
	"fmt"
	massetfs "github.com/elazarl/go-bindata-assetfs"
	"net/http"
	"strings"
)

type binaryFileSystem struct {
	fs http.FileSystem
}

func (b *binaryFileSystem) Open(name string) (http.File, error) {
	fmt.Println("staticWebSource::open=>", name)
	return b.fs.Open(name)
}

func (b *binaryFileSystem) Exists(prefix string, filepath string) bool {

	fmt.Println("staticWebSource::exist=>", filepath)
	if p := strings.TrimPrefix(filepath, prefix); len(p) < len(filepath) {
		fmt.Println("staticWebSource::exist=>", "error")
		if _, err := b.fs.Open(p); err != nil {
			return false
		}
		return true
	}
	return false
}

func BinaryFileSystem(root string) *binaryFileSystem {
	fs := &massetfs.AssetFS{Asset, AssetDir, AssetInfo, root}
	return &binaryFileSystem{
		fs,
	}
}
