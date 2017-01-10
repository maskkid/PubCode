/**
 * 解析客户端发过来的数据
 * 标记客户端在线/下线状态
 */
package simo

import (
	"fmt"
	"net"
	"strings"
)

type InfoItem struct {
	remote_addr string // conn.remoteAddr
	device_code string
	voltage     string // 电压
	current     string // 电流
	timeline    string // 设备发送时间
}

func GetInfo(conn *net.Conn, message chan string) *InfoItem {
	s := <-message

	_conn := *conn

	fmt.Println("New data::", s)
	arr := strings.Split(s, ",")
	/*
		if err {
			return
		}
	*/
	infoitem := InfoItem{remote_addr: _conn.RemoteAddr().String()}
	fmt.Println(arr)
	if len(arr) < 1 {
		return &infoitem
	}
	/*
		if err != nil {
			return false
		}*/
	infoitem.device_code = arr[0]
	if len(arr) < 2 {
		return &infoitem
	}
	infoitem.voltage = arr[1]
	if len(arr) < 3 {
		return &infoitem
	}
	infoitem.current = arr[2]
	if len(arr) < 4 {
		return &infoitem
	}
	infoitem.timeline = arr[3]
	return &infoitem
}

func Connected(conn *net.Conn) {
	fmt.Println("--- connected ---")
}

func Colsed(conn *net.Conn) {
	fmt.Println("--- closed ---")
}
