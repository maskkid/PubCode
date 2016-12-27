#include <iostream>
#include <typeinfo>
#include <string>
#include "EnumStudy.h"
using namespace std;;

EnumStudy::EnumStudy()
{
    //ctor
    cout << "-------------" << typeid(this).name() << "-----start" << endl;
}

EnumStudy::~EnumStudy()
{
    cout << "-------------" << typeid(this).name() << "-----end" << endl;
    //dtor
}

void EnumStudy::showcase() {
    enum Person{simo, evekcin, onrd};
    string s[] = {"simo", "evekcin", "onrd"};
    Person p;
    p = evekcin;
    cout << simo << onrd << evekcin << endl;
    cout << s[p] << endl;
}

// null提高效率
void EnumStudy::nullitem(char* str[]) {
    char* strin[] = {"a11111", "b22222", "c33333", "d4444444", "e555555", NULL};
    cout << "*str=" << *str << endl;
    cout << "*strin=" << *strin << endl;
    cout << "str[2]=" << str[2] << endl;
    cout << "*str[2]=" << *str[2] << endl;
    cout << "strin[2]=" << strin[2] << endl;
    cout << "*strin[2]=" << *strin[2] << endl;
    while(*str) {
        cout << *str++<< endl;
    }

}
