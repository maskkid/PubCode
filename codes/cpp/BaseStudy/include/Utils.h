#ifndef UTILS_H
#define UTILS_H

#include <iostream>
#include <string>

class Utils
{
    public:
        Utils();
        virtual ~Utils();

        //template<class T> void static trace(T);
        void static trace(char *);
    protected:
    private:
};

#endif // UTILS_H
