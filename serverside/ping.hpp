#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <cstdlib>
#include <string>
//#include <unistd.h>

#include <unordered_map>
#include <thread>
#include <iostream>
#include <iomanip>
#include <mutex>
#include <vector>
#include <algorithm>

using std::cout;
using std::endl;
using std::unordered_map;
using std::string;
using std::thread;
using std::mutex;
using std::lock_guard;
using std::vector;
using std::to_string;

static vector<string> ipaddrs;
static string ip ("192.168.0.");

static mutex vec_mtx;