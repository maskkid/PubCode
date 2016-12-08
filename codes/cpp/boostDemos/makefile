prefix=/usr
LIBPATH=$(prefix)/lib64

FILELIST_LIBS+=$(LIBPATH)/libboost_filesystem.a
FILELIST_LIBS+=$(LIBPATH)/libboost_system.a

filelist:
	g++ -O filelist.cpp -o filelist.bin $(FILELIST_LIBS)


OPTIONS_LIBS+=$(LIBPATH)/libboost_program_options.a
program_options:
	g++ -O program_options.cpp -o program_options.bin $(OPTIONS_LIBS)


