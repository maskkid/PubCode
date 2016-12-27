#include "TplDemo.h"
#include <iostream>
#include <string>


TplDemo::TplDemo()
{
    //ctor
}

TplDemo::~TplDemo()
{
    //dtor
}

void TplDemo::say(string s) {
    cout << "T1 -> " << s << endl;
}

void TplDemo::show(int a) {
    cout << "T2 -> " << a << endl;
}
