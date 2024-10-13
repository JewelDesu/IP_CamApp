#include "ping.hpp"

void count_open_addr(int start, int end)
{
        for(int i=start;i<end;i++)
    {
        string com ("ping -c1 -s1" + ip + to_string(i));
        int bing = system(com.c_str());
        if (bing == 0)
            {
                lock_guard<mutex> guard(vec_mtx);
                ipaddrs.push_back(ip + to_string(i));

            }
    }
}

void print_addr(vector<string>& ipaddrs, int start, int end){

    for (int i=0;i<sizeof(ipaddrs);i++){
        cout << "\033[1m" << i << "\033[0m\n";
    }

}   

void thread_handler(int start, int end)
{
    int max_threads = thread::hardware_concurrency();
    thread thread_list[max_threads];
    int interval_size = (end - start + 1)/max_threads;
    int thread_num;

    for (thread_num = 0; thread_num < max_threads; thread_num++){
        int right_bound = start + interval_size;
        thread_list[thread_num] = thread(count_open_addr, start, right_bound);
        start = right_bound + 1;
    }
    for (thread_num = 0; thread_num < max_threads; thread_num++){
        thread_list[thread_num].join();
    }

    print_addr(ipaddrs,start,end);
    
}


int main() {
    int start = 1;
    int end = 255;

    thread_handler(start,end);

    return 0;
}
