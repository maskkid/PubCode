#include <boost/thread.hpp>
#include <iostream>

using namespace std;

// wait
void wait(int sec) {
    boost::this_thread::sleep(boost::posix_time::seconds(sec));
}

void thread() {
    for(int i=0; i<5; i++) {
        wait(1) ;
        cout << i << endl;
    }
}

template <typename T>
void trun(T d) {
    boost::thread t(d);
    t.join();
}

int main()
{
    /*
    boost::thread t(thread);
    t.join();
    */
    int n = 10;
    while(n--) {
        trun(&thread);
    }
    return 0;
}
