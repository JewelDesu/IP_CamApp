#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <cstdlib>
#include <string>
#include <fstream>
#include <iostream>
#include <iomanip>
#include <chrono>
#include <thread>

using std::cout;
using std::endl;
using std::string;
using std::to_string;
using std::ifstream;
using std::ofstream;
using std::getline;
using namespace std::this_thread;
using namespace std::chrono;

struct host {
    string ipaddr;
    string macaddr;
};
struct vendors {
    string macaddr;
    string vendor;
};
struct list {
    string ip;
    string vendor;
    string addr;
};