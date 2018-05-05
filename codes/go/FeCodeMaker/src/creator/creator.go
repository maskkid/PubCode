/**
 * 结构化数据生成
 * 基本设计：
 * 	1. 定义基础解析器（输入，输出）
 *  2. 定义基础输出标准（文件、数据库等等）
 *  3. 完成表单和列表解析器
 *  4. 提供转换器，用于从web提交数据转换成对应生成器的数据结构
 */

package creator

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"regexp"
)

// ======================= 结果输出
// 输出标准
type Outputor interface {
	Replace(tag string, s string) (rst string)
	Output(s string) (rst bool)
}

// 文件输出
type FileOutputor struct {
	tplpath string
	outpath string
}

// 替换标记为对应的字符串
func (self *FileOutputor) Replace(content string, tag string, s string) string {
	r := regexp.MustCompile("<<<" + tag + ">>>")
	rst := r.ReplaceAllString(content, s)
	return string(rst)
}

func (self *FileOutputor) Output(s string) bool {
	fo, err := os.Open(self.tplpath)
	if err != nil {
		fmt.Print("[simo]Error::", err.Error())
		return false
	}
	fmt.Println(fo)

	// 读取
	tpl, err := ioutil.ReadFile(self.tplpath)
	if err != nil {
		fmt.Print("[simo]Error::", err.Error())
		return false
	}
	tplstr := string(tpl)

	// 正则替换原始内容中 对应的标签处内容 为 要输出的字符串
	newstr := self.Replace(tplstr, "data", s)

	// 写入
	werr := ioutil.WriteFile(self.outpath+"/temp.ts", []byte(newstr), 0644)
	if err != nil {
		fmt.Println("[simo]FileOutput Errof::", werr)
	}

	fmt.Println("[simo]FileOutput::", newstr)
	return true
}

// 数据库输出
type DBFileOutputor struct {
	host string
	db   string
	name string
	pass string
}

func (d *DBFileOutputor) Output(s string) bool {
	return true
}

// ========================= END 结果输出

// 单项配置
type FormItem struct {
	Uitype string // 展示类型
	Label  string //
	Model  string
	Rules  string
	Ui     map[string]string
}

type ColItem struct {
	Uitype    string
	Label     string
	Decorator string // 装饰函数
}

// 表单
type ConfForm struct {
	ActionUrl string
	Buttons   string      // 默认保存、返回
	Items     []*FormItem // 所有表单项
}

// 列表
type ConfList struct {
	ActionUrl  string
	SearchForm *ConfForm
	Columns    []*ColItem
	Page       map[string]string
}

// 基础创建器
type Creator struct {
	rststr string // 格式化后的字符串
}

// 生成字符串
func (c *Creator) Create() string {
	fmt.Println("Creator", c.rststr)
	return ""
}

// 输出数据
func (c *Creator) Output(s string) bool {
	var fp = &FileOutputor{
		tplpath: "tplroot/react/commonform.tpl",
		outpath: "./",
	}
	fp.Output(s)
	return true //fp.Output(s) // 默认使用文件输出
}

// 表单创建器
type FormCreator struct {
	Creator
	Conf *ConfForm
}

// 生成form字符串
func (fc *FormCreator) Create() string {
	fc.Creator.Create()
	x, _ := json.Marshal(fc.Conf)
	fmt.Println("conf::", string(x))
	fc.rststr = string(x)
	return string(x)
}

type ListCreator struct {
	Creator
	Conf *ConfList
}

// 生成列表字符串
func (lc *ListCreator) Create() string {
	lc.Creator.Create()
	x, _ := json.Marshal(lc.Conf)
	fmt.Println("list conf::", string(x))
	lc.rststr = string(x)
	return lc.rststr
}
