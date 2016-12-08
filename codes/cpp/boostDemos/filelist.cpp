#include <iostream>
#include <boost/filesystem/operations.hpp>
#include <boost/filesystem/path.hpp>
#include <boost/filesystem/fstream.hpp>

using namespace std;
using namespace boost;
namespace fs = boost::filesystem;


int main()
{
    string pt = "/home/simo/";
    fs::path path = complete(fs::path(pt));
    fs::directory_iterator end;
    for(fs::directory_iterator i(path); i!=end; i++) {
        //string name = pt + *i;
        cout << *i << endl;
    }
    return 0;
}
