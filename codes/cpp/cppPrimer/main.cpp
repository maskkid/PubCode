#include <iostream>
#include <string>
#include <typeinfo>

using namespace std;

// console func
template<typename T>
void trace(T s) {
    std::cout << "\n\n----------------------------------\n|\t[" << __LINE__ << " : " << s << "]\n----------------------------------\n";
}

int main()
{
    // string
    char s[] = "abcd";
    char *ss = "hijk";

    trace(s);
    trace(ss);

    // typeid
    int n = 8;
    string s2 = "hahaha";
    cout << typeid(n).name());
    trace(typeid(n).name());
    trace(typeid(s2).name());
    return 0;
}

