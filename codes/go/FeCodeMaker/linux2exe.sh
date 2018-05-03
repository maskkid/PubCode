#!/bin/bash
export CGO_ENABLED=0 
#export GOOS=darwin # mac
export GOOS=windows 
export GOARCH=amd64
export CGO_ENABLED=0 

export PATH=$PATH:$PWD
export GOPATH=$PWD
export GOPKG=$PWD/pkg
echo ++++++++++++++++++++++
echo main.go building 2 exe ...
echo ++++++++++++++++++++++
go build -o bin/main.exe src/main.go
echo main.exe ok ...
echo ----------------------
#clear
#./bin/main.bin
