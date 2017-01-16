package lessons

import (
	"fmt"
)

func DemoArray() {
	// 数组 与 切片， 数组只能是定长，切片是数组的抽象，不定长
	var a = [5] string {"a", "b", "c", "d", "e"} // 指定长度
	var b = [...] string {"a", "b"} // 不指定长度

	var len = 5
	c := make([]string, len) // 初始化切片长度为5

	fmt.Println("")
}
