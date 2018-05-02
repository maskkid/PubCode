#!/bin/bash
export PATH=$PATH:$PWD
export GOPATH=$PWD
export GOPKG=$PWD/pkg

go get github.com/gin-gonic/gin
./compile.sh
