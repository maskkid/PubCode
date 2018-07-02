package basefetch

import (
	"fmt"
	"github.com/parnurzeal/gorequest"
)

func Get(url string, cb func(body string)) {
	fmt.Println("::::::::Get", url)
	fetcher := &Http{}
	fetcher.Get(url, cb)
}

type Http struct {
	Conf map[string]string
}

func (this *Http) Get(url string, cb func(body string)) {
	gorequest.New().Get(url).End(func(resp gorequest.Response, body string, errs []error) {
		fmt.Println("::::::basefetch status::", url, resp.Status)
		cb(body)
	})
}
