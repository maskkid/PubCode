#include <fstream>
#include <string>
#include <vector>
#include <iostream>

/*
using std::vector;
using std::string;
using std::ifstream;
using std::cout;
using std::endl;
*/
using namespace std;

void readFileVec(const string& filename, vector<string>& vec) {
    ifstream ifs(filename);
    if(ifs) {
        string buf;
        while(std::getline(ifs, buf)){
            vec.push_back(buf);
        }
    }
}

int main() {
    vector<string> vec;
    readFileVec("./data/book.txt", vec);
    for(const auto &str : vec) {
        cout << str << endl;
    }

    return 1;
}
