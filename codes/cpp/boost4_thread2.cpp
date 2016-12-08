// don't understand...  oprator??
#include <boost/thread/thread.hpp>
#include <boost/thread/mutex.hpp>
#include <iostream>

boost::mutex io_mutex;

struct count
{
    count(int id): id(id) {}

    void operator()()
    {
        for(int i = 0; i<10; i++) {
            boost::mutex::scoped_lock lock(io_mutex);
            std::cout << id << ":" << i << std::endl;
        }
    }
    int id;
};

int main(int argc, char* argv[]){
    boost::thread t1(count(1));
    boost::thread t2(count(2));
    t1.join();
    t2.join();
    return 0;
}


