package main

import (
	"fmt"
	"net/http"
	// "github.com/astaxie/beego"
	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("server is running...")
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.GET("/user/:name", func(c *gin.Context) {
		name := c.Param("name")
		c.String(http.StatusOK, name)
	})

	r.GET("/bbs/list", func(c *gin.Context) {
		c.String(http.StatusOK, "list")
	})

	r.GET("/bbs/show/*topicid", func(c *gin.Context) {
		topicid := c.Param("topicid")
		c.String(http.StatusOK, "bbs/show/%s", topicid)
	})

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "index")
	})

	r.Run()
}
