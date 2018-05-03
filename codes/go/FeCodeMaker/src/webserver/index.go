package webserver

import (
	"fmt"
	"os"

	//"gopkg.in/gin-gonic/gin.v1"
	"github.com/gin-gonic/gin"
	"net/http"
)

const SERVER_INFO = "SIMO tiny web server"

type ServerHeader struct {
	gin.ResponseWriter
	ServerInfo string
}

func (w *ServerHeader) Write(data []byte) (int, error) {
	if w.Header().Get("Server") == "" {
		w.Header().Add("Server", w.ServerInfo)
	}
	return w.ResponseWriter.Write(data)
}

func InitServerHeader() gin.HandlerFunc {
	return func(c *gin.Context) {
		writer := &ServerHeader{c.Writer, SERVER_INFO}
		c.Writer = writer
		c.Next()
	}
}

type Server struct {
	Port    string
	Webroot string
	Router  *gin.Engine
}

func (s *Server) Init() {
	s.Router = gin.Default()
	s.Router.Delims("{[{", "}]}")
	s.Router.Use(InitServerHeader())
	s.Webroot = "./webroot/"
	s.Router.Static("/statics", s.Webroot+"statics")
	s.Router.LoadHTMLGlob(s.Webroot + "*.html")
	fmt.Println(s.Webroot, os.Args[0])
	s.Router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "Main website",
		})
	})

	// 生成
	s.Router.POST("/api/create", func(c *gin.Context) {

	})
}

func (s *Server) Start() {
	fmt.Println("webserver start:", s.Port)
	s.Router.Run(":" + s.Port)
}
