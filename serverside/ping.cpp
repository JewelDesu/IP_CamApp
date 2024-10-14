#include "ping.hpp"

void count_open_addr(int start, int end)
{
        for(int i=start;i<end;i++)
    {
        string com ("ping -c1 -s1 -w1 " + ip + to_string(i));
        int bing = system(com.c_str());
        if (bing == 0)
            {
                lock_guard<mutex> guard(vec_mtx);
                ipaddrs.push_back(ip + to_string(i));

            }
    }
}

int get_line_count()
{
    ifstream arp("/proc/net/arp");

    int n=0;
    string line;

    while(getline(arp,line))
        n++;
    arp.close();
    return n;
}

void print_addr(vector<string>& ipaddrs, vector<string>& macaddrs){

    for (int i=0;i<sizeof(ipaddrs);i++){
        cout << ipaddrs[i] << " " << macaddrs[i] << endl;
    }

} 

void sorting_adresses (struct adresses* addr)
{
    int n=sizeof(ipaddrs);

    for(int i=0;i<n;i++)
    {
        for(int j=0;j<n;j++)
        {
            if(ipaddrs[i] == addr[j].ipaddr)
            {
                macaddrs[i]=addr[j].macaddr;
            }
        }
    }
    print_addr();
}

void ping_active_adresses()
{
    for(int i=0;i<sizeof(ipaddrs);i++)
    {
        string com ("ping -c1 -s1 -w1 " + ipaddrs[i]);
        int bing = system(com.c_str());
    }
}  

void get_mac_adresses ()
{
    adresses* addr = new adresses[get_line_count()];
    ifstream arp("/proc/net/arp");
    int t=1;
    string add,hw,flag,mac,mask,device;
    while(!arp.eof())
    {
        for(int i=1;i<sizeof(ipaddrs)+1;i++)
        {
            for(int j=0; j<6;j++)
            {
                arp>>add;
                arp>>hw;
                arp>>flag;
                arp>>mac;
                arp>>mask;
                arp>>device;
            }
            addr[i].ipaddr = add;
            addr[i].macaddr = mac;  
        }

    }
    arp.close();

    
    sorting_adresses(addr);

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

    ping_active_adresses();
    get_mac_adresses();
    
}

int main_ping() {
    int start = 1;
    int end = 255;

    thread_handler(start,end);
    
    
    return 0;
}
