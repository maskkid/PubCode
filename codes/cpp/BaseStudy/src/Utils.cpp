#include "Utils.h"

Utils::Utils()
{
    //ctor
}

Utils::~Utils()
{
    //dtor
}

/*
template<class T> void Utils::trace(T s) {
    std::cout << "\n\n----------------------------------\n|\t[" << __LINE__ << " : " << s << "]\n----------------------------------\n";
}*/

void Utils::trace(char * s) {
    std::cout << "\n\n----------------------------------\n|\t[" << __LINE__ << " : " << s << "]\n----------------------------------\n";
}
