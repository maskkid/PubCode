#ifndef FSTREAMDEMO_H
#define FSTREAMDEMO_H
#include <iostream>
#include <fstream>

class FstreamDemo
{
    public:
        static char * s[];
        FstreamDemo();
        virtual ~FstreamDemo();
        void static show_fstream_write();
        void static show_fstream_read();
    protected:
    private:
};

#endif // FSTREAMDEMO_H
