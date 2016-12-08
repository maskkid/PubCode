#include <istream>
#include <iostream>

std::istream& getIstream(std::istream& is) {
    std::string buf;
    while(is >> buf) {
        std::cout << buf << std::endl;
    }
    is.clear();
    return is;
}

int main() 
{
//    getIstream(std::cin);
    std::istream& is = getIstream(std::cin);    
    std::cout << is.rdstate() << std::endl;
    return 1;
}
