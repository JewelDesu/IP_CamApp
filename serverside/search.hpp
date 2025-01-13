#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <string>
#include <fstream>
#include <iostream>
#include <mysql.h>
#include <sqlite3.h>

using std::cout;
using std::cin;
using std::cerr;
using std::endl;
using std::string;
using std::exception;
using std::stringstream;
using std::to_string;
using std::ifstream;
using std::ofstream;
using std::getline;

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