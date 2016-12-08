#include <fstream>
#include <vector>
#include <iostream>

using std::vector;
using std::string;
using std::ifstream;
using std::cout;
using std::endl;

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
    readFileVec("./data/book.txt");
    for(const auto &str : vec) {
        cout << str << endl;
    }

    return 1;
}
