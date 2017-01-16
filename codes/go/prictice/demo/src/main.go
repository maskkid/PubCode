package main

import (
	"fmt"
	// "os"
	// "strconv"
	// local pkg
	"demos"
)


//////////////////////////////////////
//
// 帮助
//
//
////////////////////////////////////////
func helpshow() {
	fmt.Println("------------------------|")
	fmt.Println("|    Syncsimo Server    |")
	fmt.Println("|                       |")
	fmt.Println("|  For server listener  |")
	fmt.Println("|  Useage::             |")
	fmt.Println("|    ssv server port    |")
	fmt.Println("------------------------|")
}

/**
 * [main description]
 * @return {[type]} [description]
 */
func main() {
	demos.MultiSpider();
}
