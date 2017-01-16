package main

import (
	"fmt"
	"os"

	// local pkg
	"simo"
)

// server conf
func getServerConf() *map[string]string {
	m := make(map[string]string)
	m["showmsg"] = ""
	return &m
}

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
	fmt.Println("|  Usage::              |")
	fmt.Println("|    ssv server port    |")
	fmt.Println("------------------------|")
}

////////////////////////////////////////////////////////
//
//主程序
//
//参数说明：
//	启动服务器端：  Chat server [port]				eg: Chat server 9090
//
////////////////////////////////////////////////////////
func main() {
	if len(os.Args) != 3 {
		helpshow()
	} else {
		if os.Args[1] == "server" && len(os.Args) == 3 {
			conf := getServerConf()
			simo.StartServer(os.Args[2], conf)
		} else {
			fmt.Println("Command error")
			helpshow()
		}
	}

}
