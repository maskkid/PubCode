#include <iostream>
#include <vector>
#include <string>
#include "LessonVector.h"

using namespace std;

LessonVector::LessonVector()
{
    //ctor
}

LessonVector::~LessonVector()
{
    //dtor
}

void LessonVector::showDemo1() {
    vector<int> vct(10);
    for(int i=0; i<10; i++) {
        vct[i] = i;
    }
    cout << "__LessonVector::showDemo1 --> " << &vct << "\t" << vct.size() << endl;
}

void LessonVector::showDemo2() {
    int arr[] = {3,4,0,6,9,7,8,8,8};
    vector<int> vct(arr, arr+5);
    cout << "__LessonVector::showDemo2 --> " << &vct << "\t" << *(arr+1) << "\t" << vct.size() << endl;
}

void LessonVector::showDemo3() {
    string arr[] = {"aaa", "bb", "ccc", "ddd"};
    vector<string> vct(arr, arr+3);
    vector<string> vct2(vct); // 用另外的vector初始化
    vector<string> vct3;
    vct3 = vct; // 直接拷贝
    cout << "__LessonVector::showDemo3 --> " << (*(&vct))[0] << "\t" << vct[0] << "\t" << vct.size() << endl;
}

// 真正用vector的方法来操作
void LessonVector::showDemo4() { // STL 用法
    vector<string> text;
    string _s;
    cout << "input a string :" << endl;
    while(cin >> _s) {
        if(_s=="exit") break;
        text.push_back(_s);
    }
    cout << "showDemo4-->text->point " << "\t" << &text << endl;
    for(vector<string>::iterator it = text.begin();
        it != text.end(); it++) {
        cout << &it << "\t" << *it << endl;
    }
    cout << "__LessonVector::showDemo3 --> " << &text << "\t" << text[0] << "\t" << text.size() << endl;
}
