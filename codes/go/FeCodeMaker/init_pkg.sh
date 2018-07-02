#!/bin/bash
export PATH=$PATH:$PWD
export GOPATH=$PWD
export GOPKG=$PWD/pkg

go get -u github.com/golang/net .
go get github.com/gin-gonic/gin
go get github.com/elazarl/go-bindata-assetfs
go get github.com/gin-gonic/contrib/static
go get github.com/tidwall/gjson # json parser package
go get github.com/parnurzeal/gorequest # request package
./compile.sh
