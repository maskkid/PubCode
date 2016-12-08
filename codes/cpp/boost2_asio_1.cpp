#include <iostream>
#include <istream>
#include <ostream>
#include <string>
#include <boost/asio.hpp>

using boost::asio::ip::tcp;

int main(int argc, char* argv[]) {

    std::cout<< argc << std::endl;
    boost::system::error_code ec;
    std::string hostname = boost::asio::ip::host_name(ec);
    std::cout << "hostname:" << hostname << std::endl;
    std::cout << "error:" << ec.value() << std::endl;
    return 0;
}
