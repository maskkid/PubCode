package simo

import (
	"fmt"
	"runtime"
)

func OSinfo() {
	fmt.Printf("%s", runtime.GOOS)
}
