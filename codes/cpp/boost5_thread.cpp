#include <boost/thread/thread.hpp>
#include <boost/thread/thread.hpp>
#include <boost/bind.hpp>
#include <iostream>

boost::mutex io_mutex;

void count(int id) {
    for(int i=0; i<10; i++) {
        boost::mutex::scoped_lock lock(io_mutex);
        std::cout << id << ":" << i << std::endl;
    }
}

int main(int argc, char* argv[]) {
    boost::thread t1(
            boost::bind(&count, 11111)
            );
    boost::thread t2(
            boost::bind(&count, 22222)
            );
    t1.join();
    t2.join();

    return 0;
}
