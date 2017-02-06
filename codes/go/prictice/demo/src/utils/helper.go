package utils

import (
	"fmt"
	"os"
)

func show() {

}

func Line(s string) {
	fmt.Println("-------------- ", s, " -------------")
}

func CheckError(err error) {
	if err != nil {
		fmt.Println("utils::CheckError=> ", err)
		os.Exit(1)
	}
}
