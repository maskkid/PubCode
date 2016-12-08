#include <iostream>
#include <string>
#include <boost/regex.hpp>

using namespace std;
using namespace boost;

int main(int argc, char* argv[])
{
    string str;

    cout << "intput source:";
    getline(cin, str);

    while(true) {
        string regex_str;
        cout << "input regex:";
        getline(cin, regex_str);
        regex delimeter(regex_str);

        vector<string> results;
        string s = str;
        regex_split(back_inserter(results), s, delimeter);
        cout << str << endl;

        for(int i=0; i<results.size(); i++) {
            cout << '"' << results[i] << '"' << endl;
        }
    }

    return 0;
}
