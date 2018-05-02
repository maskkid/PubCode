/**
 * 结构化数据生成
 * 基本设计：
 * 	1. 定义基础解析器（输入，输出）
 *  2. 定义基础输出标准（文件、数据库等等）
 *  3. 完成表单和列表解析器
 */

package main

import "fmt"

// ======================= 结果输出
// 输出标准
type Outputor interface {
	Output(s string) (rst bool)
}

// 文件输出
type FileOutputor struct {
}

func (f *FileOutputor) Output(s string) bool {
	fmt.Println(s)
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
type FromItem struct {
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
	Buttons   string     // 默认保存、返回
	Items     []FromItem // 所有表单项
}

// 列表
type ConfList struct {
	ActionUrl string
	Columns   []ColItem
	Page      map[string]string
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
	return &FileoutPutor.Output(s) // 默认使用文件输出
}

// 表单创建器
type FromCreator struct {
	Creator
	conf ConfForm
}

// 生成form字符串
func (fc *FormCreator) Create() string {
	var str = ""
	fc.rststr = "hahahah"
	fc.Creator.Create()
	return str
}

type ListCreator struct {
	Creator
	conf ConfList
}

// 生成列表字符串
func (lc *ListCreator) Create() string {
	return ""
}
