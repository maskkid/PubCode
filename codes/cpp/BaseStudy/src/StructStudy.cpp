#include <iostream>
#include <typeinfo>
#include "StructStudy.h"
using namespace std;

StructStudy::StructStudy()
{
    //ctor
    cout << "-------------" << typeid(this).name() << "-----start" << endl;
}

StructStudy::~StructStudy()
{
    //dtor
    cout << "-------------" << typeid(this).name() << "-----end" << endl;
}

void StructStudy::showcase() {
    struct Stct {
        char    name[6];
        int     age;
        float   height;
    } a,b;

    Stct *pa;
    Stct *pb;
    pa = &a;
    pb = &b;
    pa->age = 10;
    *pb = *pa;
    cout << a.age << endl;
    cout << b.age << endl;
}
