package webserver

import (
	"fmt"
	"os"

	//"gopkg.in/gin-gonic/gin.v1"
	"creator"

	"encoding/json"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/tidwall/gjson"
	"net/http"
)

const DEBUG = false

var x = &creator.FormItem{}

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

/**
 * 请求数据结构体
 */
// form creator 结构体
type FormCreatorReq struct {
	suburl string `json:"suburl"`
	//buttons   []map[string]string `json:"buttons"`
	items []map[string]string `json:"items[]"`
}

type Server struct {
	Port    string
	Webroot string
	Router  *gin.Engine
}

// 获取压缩后的web资源
func (s *Server) GetWebsource(path string) string {
	rst, _ := Asset(s.Webroot + path)
	return string(rst)
}

// 获取post request body
func (s *Server) GetReqBody(c *gin.Context) string {
	buf := make([]byte, 1024)
	n, _ := c.Request.Body.Read(buf)
	rst := string(buf[:n])
	fmt.Println("request body::", rst)
	return rst
}

func (s *Server) Init() {
	s.Router = gin.Default()
	s.Router.Delims("{[{", "}]}")
	s.Router.Use(InitServerHeader())

	// debug mode
	if DEBUG == true {
		s.Webroot = "./webroot/"
		s.Router.Static("/statics", s.Webroot+"statics")
		s.Router.LoadHTMLGlob(s.Webroot + "*.html")
	} else {
		s.Webroot = "webroot/"
		s.Router.Use(static.Serve("/statics", BinaryFileSystem(s.Webroot+"statics")))
	}

	fmt.Println("========>", s.Webroot, os.Args[0])

	// @Controller
	// route settings
	// route index
	s.Router.GET("/", func(c *gin.Context) {
		if DEBUG == true {
			c.HTML(http.StatusOK, "index.html", gin.H{
				"title": "Main website",
			})
		} else {
			c.Header("Content-Type", "text/html; charset=utf-8")
			c.String(http.StatusOK, s.GetWebsource("index.html"))
		}
	})

	// @Controller
	// api route::create form 生成
	s.Router.POST("/api/creator/commonform", func(c *gin.Context) {
		suburl := c.PostForm("suburl")
		jsonstr := c.PostForm("jsonstr") // 全部数据json

		fmt.Println("[simo]jsonstr::", jsonstr)
		compmentname := gjson.Parse(jsonstr).Get("compment").String()
		fmt.Println("?????????", compmentname)
		if compmentname == "" {
			compmentname = "unamed.list"
		}

		// 对应的表单生成器配置结构体
		confform := &creator.ConfForm{
			ActionUrl: suburl,
			Buttons:   "",
			Items:     []*creator.FormItem{},
		}

		c.Request.ParseForm()
		for key, val := range c.Request.PostForm {
			if key != "items[]" {
				continue
			}
			for _, vali := range val {
				json_data := make(map[string]string, 1)
				err := json.Unmarshal([]byte(vali), &json_data)
				if err != nil {
					fmt.Println("[simo] json change error::", err)
					continue
				}
				fmt.Println("[simo] post data::", key, val, json_data)
				confform.Items = append(confform.Items, &creator.FormItem{
					/*
						Uitype string // 展示类型
						Label  string //
						Model  string
						Rules  string
						Ui     map[string]string
					*/
					Uitype: json_data["type"],
					Label:  json_data["label"],
					Model:  json_data["model"],
					Rules:  json_data["rules"],
					Ui:     map[string]string{},
				})
			}
		}

		// 执行生成器生成逻辑
		fc := &creator.FormCreator{
			Conf: confform,
		}
		fc.Create()
		rst := fc.Output(jsonstr, compmentname+".ts") // 输出文件

		/*
			var formconf FormCreatorReq
			if c.BindJSON(&formconf) == nil {
				fmt.Println("request body 2 formconf::", formconf)
			}
		*/

		//fmt.Println("commform post data::", confform)
		c.JSON(0, gin.H{
			"status":  0,
			"message": "",
			"data":    rst,
		})
	}) // Controller Common form END

	// @Controller
	// api route::create list 生成
	s.Router.POST("/api/creator/commonlist", func(c *gin.Context) {
		jsonstr := c.PostForm("jsonstr") // 全部数据json

		compmentname := gjson.Parse(jsonstr).Get("compment").String()
		fmt.Println("?????????", compmentname)
		if compmentname == "" {
			compmentname = "unamed.list"
		}

		// 执行生成器生成逻辑
		lc := &creator.ListCreator{}
		lc.Create()
		rst := lc.Output(jsonstr, compmentname+".ts") // 输出文件

		c.JSON(0, gin.H{
			"status":  0,
			"message": "",
			"data":    rst,
		})
	})
}

func (s *Server) Start() {
	fmt.Println("webserver start:", s.Port)
	s.Router.Run(":" + s.Port)
}
