#include <iostream>
#include <string>
#include <boost/regex.hpp>

using namespace std;

int main(int argc, char* argv[])
{
    boost::regex reg_exp;
    string str_reg;
    string str;
    string replace;
    string results;

    cout << "input Regular Expression :" ;
    getline(cin, str_reg);
    reg_exp = str_reg;
    cout << "input Replace word:";
    getline(cin, replace);

    /* why wtf=string cannot run?? but cin string can??? what the fuck! 
    boost::regex wtf;
    wtf = boost::regex(".*");
    cout << endl << boost::regex_replace("abc", wtf, "?", boost::format_no_copy) << endl;
    */

    while(true) {
        cout << "input Result word:";
        getline(cin, str);
        results = boost::regex_replace(str, reg_exp, replace, boost::format_no_copy);
        cout << results << endl;
    }

    return 0;
}
