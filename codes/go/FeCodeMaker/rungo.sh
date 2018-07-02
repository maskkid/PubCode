#!/bin/bash
export PATH=$PATH:$PWD
export GOPATH=$PWD
export GOPKG=$PWD/pkg

go run src/${1}
