@echo off&title simo cmd&prompt ^>
set GOPATH=%cd%
rem set /p biname=Enter the index file name:
set biname=main
if biname=="" biname=main
go build -o bin/%biname%.exe src/%biname%.go
echo +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
echo compile success!
echo ---------------------------------------------------------
echo Usage^:
echo %biname%.exe [args]
echo +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

"bin/%biname%.exe"