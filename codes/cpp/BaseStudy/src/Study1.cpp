#include <iostream>
#include "Study1.h"
using namespace std;

Study1::Study1(int x, int y, int z)
    :a(x), b(y), c(z)
{
    //ctor
}

int Study1::say()
{
    cout << "im saying. a-->" << a << endl;
}

Study1::~Study1()
{
    //dtor
}
