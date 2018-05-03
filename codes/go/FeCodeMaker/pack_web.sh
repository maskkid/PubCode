#!/bin/bash
export PATH=$PATH:$PWD
export GOPATH=$PWD
export GOPKG=$PWD/pkg

./go-bindata-assetfs webroot/...
mv bindata_assetfs.go src/webserver/
