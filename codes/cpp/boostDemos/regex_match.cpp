#include <iostream>
#include <string>
#include <boost/regex.hpp>

using namespace std;
using namespace boost;

int main (int argc, char* argv[])
{
    string str = "asdfstststst.st.stsssts.stst..st.s.ts.t.stqwersadfasjflkj;kljklj";
    if(regex_match(str, regex(".*t.st.*"))) {
        cout << "match" << endl;
    } else {
        cout << "not match" << endl;
    }

    return 0;
}
