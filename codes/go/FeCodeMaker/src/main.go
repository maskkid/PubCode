package main

import (
	"flag"
	"fmt"
	//"os"
	// "strconv"
	// local pkg
	//"demos"
	"creator"
	"webserver"
)

//////////////////////////////////////
//
// 帮助
//
//
////////////////////////////////////////
func helpshow() {
	fmt.Println("------------------------|")
	fmt.Println("|    FE code maker      |")
	fmt.Println("|-----------------------|")
	fmt.Println("|  Useage::             |")
	fmt.Println("|    fcm run            |")
	fmt.Println("|-----------------------|")
	fmt.Println("|author: simo           |")
	fmt.Println("|email : im@onrd.net    |")
	fmt.Println("------------------------|")
}

/**
 * [main description]
 * @return {[type]} [description]
 */
func main() {
	helpshow()

	webport := flag.String("webport", "2018", "Input the webserver port")
	//webport := flag.Int("webport", 2018, "Input the webserver port")
	flag.Parse()

	fmt.Println("flags::", *webport)

	c := &creator.FormCreator{
		Conf: &creator.ConfForm{
			ActionUrl: "test",
			Buttons:   "",
			Items: []*creator.FormItem{
				&creator.FormItem{
					Uitype: "text",
					Model:  "name",
					Rules:  "string",
					Ui: map[string]string{
						"a": "a",
					},
				},
			},
		},
	}
	c.Create()

	// start webserver
	server := &webserver.Server{Port: *webport}
	server.Init()
	server.Start()
}