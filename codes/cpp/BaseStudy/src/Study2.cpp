#include <iostream>
#include "Study2.h"

using namespace std;

Study2::Study2(int a)
    :Study1(a,0,0)
{
    //ctor
}

void Study2::sing() {
    cout << "Study2 is singing." << endl;
}

Study2::~Study2()
{
    //dtor
}
