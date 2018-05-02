#!/bin/bash
export PATH=$PATH:$PWD
export GOPATH=$PWD
export GOPKG=$PWD/pkg
echo ++++++++++++++++++++++
echo main.go building ...
echo ++++++++++++++++++++++
go build -o bin/main.bin src/main.go
echo main.bin running ...
echo ----------------------
#clear
./bin/main.bin
