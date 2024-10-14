#include "ping.hpp"

struct vendors {
    string macaddr;
    string vendor;
};
struct list {
    string ip;
    string vendor;
    string addr;
};

int getLineCountVendor ();
void openfileVendor (struct vendors* v, int m);
void compare (struct vendors* v, int m);
void assignAddr (struct list* l, int var);

extern vector<string> ipaddrs;
extern vector<string> macaddrs;

int main() {

    int m=getLineCountVendor();
    cout<<m<<endl;
    vendors* v = new vendors[m];

    openfileVendor(v,m);
    for(int i=0;i<m;i++)
    {
        cout<<v[i].vendor<<"\t"<<v[i].macaddr<<endl;
    }
    compare(v,m);

}
int getLineCountVendor ()
    {
        ifstream fin("test2.txt");

        int n=0;
        string line;

        while(getline(fin,line))
            n++;

        fin.close();
        return n;
    }

void openfileVendor (struct vendors* v, int m) {
    ifstream fin("test2.txt");
    while(!fin.eof())
    {
        for(int i=0;i<m;i++)
        {
            fin >> v[i].macaddr;
            fin >> v[i].vendor;
        }

    }
    fin.close();
}

void compare (struct vendors* v, int m)
{
    list* l = new list[10];
    int var=0, car;
    //int Ran[sizeof(host)];
    
    for(int i=0;i<sizeof(ipaddrs);i++)
    {
        for(int j=0;j<m;j++)
        {
            if(macaddrs[i] == v[j].macaddr)
                {
                    l[var].ip=ipaddrs[i];
                    l[var].vendor=v[j].vendor;
                    var++;
                }

        }
    }
    assignAddr(l,var);
}

void assignAddr (struct list* l, int var)
{
    string rtsp="rtsp://admin:L279DDDC@";
    string dahua=":554/cam/realmonitor?channel=1&subtype=1";
    for(int i=0;i<var;i++)
    {
        if(l[i].vendor == "Dahua")
            l[i].addr=rtsp + l[i].ip + dahua;

    }

    for(int i=0;i<var;i++)
    {
        cout<<l[i].addr<<endl;
    }
}