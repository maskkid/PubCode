#include <iostream>
#include <string>
#include <vector>
#include "Study3.h"

using namespace std;

Study3::Study3()
{
    //ctor
}

Study3::~Study3()
{
    //dtor
}

void Study3::icout(char s) {
    cout << "===== Study3 ======>" << s << endl;
}

void Study3::showDemo() {
    vector<int> vct;
    char d = 'x';
    icout(d);
}
