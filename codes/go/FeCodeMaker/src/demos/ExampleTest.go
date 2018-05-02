package demos

import (
	"fmt"
	"math"
	"strings"

	"utils"
)

func Bom() {
	utils.Line("Bom demo")
	var prog = `BOM
package main
func main() {

}
`
	prog = strings.Replace(prog, "BOM", "\uFEFF", -1)
	fmt.Println(prog)
}

// chan int
func Chanint() {
	c := make(chan int, 10)
	fmt.Println("len(c)::", len(c))
	fmt.Println("cap(c)::", cap(c))
	if len(c) != 0 || cap(c) != 10 {
		panic("fail")
	}

	for i := 0; i < 3; i++ {
		c <- i
	}
	fmt.Println("len(c)::", len(c))
	fmt.Println("cap(c)::", cap(c))

	c = make(chan int)
	fmt.Println("len(c)::", len(c))
	fmt.Println("cap(c)::", cap(c))
	if len(c) != 0 || cap(c) != 10 {
		panic("fail")
	}
}

// channel1
func sum(a []int, c chan int) {
	sum := 0
	for _, v := range a {
		sum += v
	}
	c <- sum
}
func Channel1() {
	a := []int{7, 2, 8, -9, 4, 0}
	c := make(chan int)
	go sum(a[:len(a)/2], c)
	go sum(a[len(a)/2:], c)

	x, y := <-c, <-c
	fmt.Println(x, y, x+y)
}

// channel cache
func ChannelCache() {
	c := make(chan int, 3)
	c <- 1
	c <- 2
	c <- 3
	fmt.Println(<-c)
	fmt.Println(<-c)
	fmt.Println(<-c)
}

// struct test
type Stc1 struct {
	X, Y float64
}

func (v *Stc1) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
func Stc1Demo() {
	utils.Line("struct demo")
	s := Stc1{3, 4}
	s2 := &Stc1{4, 5}
	fmt.Println(s, s2)
	fmt.Println("Value :: math.Sqrt(3x3 + 4x4) =", s.Abs())
	fmt.Println("Pointer :: math.Sqrt(4x4 + 5x5) =", s2.Abs())
}
