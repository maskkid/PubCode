#include <iostream>
#include <vector>
#include <string>

#include "Utils.h"

#include "Study1.h"
#include "Study2.h"
#include "LessonVector.h"
#include "TplDemo.h"

using namespace std;

template <class Xclass>
void _printarr(Xclass *ps, Xclass *pe) {
    while(ps != pe) {
        cout << *ps << " ";
        ps ++;
    }
    if(ps == pe) {
        cout << endl;
    }
}

// const
class A {
public :
        A():i(0) {
            cout << this->i << endl;
        }
        A(char x):n(x) {}
        void say() {
            cout << n << endl;
            cout << "name is " << n << endl;
        }
private :
    int i;
    char n;
    const int j = 100;
};

void line(string s="line") {
    cout << "------ [" << s << "] ----------------" << endl;
}

int main() {
    const int i = 100;

    cout << i << endl;

    Study1 s1 = Study1(1,2,3);
    Study2 sty2 = Study2(4);
    s1.say();
    sty2.sing();
    sty2.say();

    Study1 &s2 = s1;


    Study1 *p1 = &s1;
    Study1 *p2 = &s2;

    cout << "p1 -> " << p1 << endl;
    cout << "p2 -> " << p2 << endl;
    cout << "p1->+1" << p1+1 << endl;

    //============================
    Utils::trace("print arr");
    int a[] = {123,32,4,43,5,45,45,56,7,678,768,322423};
    _printarr(a, a+11);

    /****************************
     * vector demo
     ****************************/
    //Study3 vctdemo = Study3();
    //vctdemo.showDemo();
    //LessonVector vt = LessonVector();
    //vt.showDemo1();
    //vt.showDemo2();
    //vt.showDemo3();
    //vt.showDemo4();


    Utils::trace("A test");
    A m = A('x');
    A *b = &m;
    b->say();

    // enum case
//    EnumStudy ens = EnumStudy();
//    ens.showcase();
//    char* str[] = {"aaaa", "bbbb", "cccc", "dddd", "eeee", NULL};
//    ens.nullitem(str);
//
//    // struct case
//    StructStudy stct = StructStudy();
//    stct.showcase();

Utils::trace("fuck");

return 0;
}

