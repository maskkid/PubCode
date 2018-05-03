#!/bin/bash
export PATH=$PATH:$PWD
export GOPATH=$PWD
export GOPKG=$PWD/pkg

go get github.com/gin-gonic/gin
go get github.com/elazarl/go-bindata-assetfs
go get github.com/gin-gonic/contrib/static
./compile.sh
