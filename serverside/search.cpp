#include <iostream>
#include <fstream>
#include <string>

using namespace std;

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

int getLineCount ();
int getLineCountVendor ();
void openfile (struct host* p, int n);
void openfileVendor (struct vendors* v, int n);
void compare (struct host* p, struct vendors* v, int n, int m);
void assignAddr (struct list* l, int var);

int main() {

    
    int n=getLineCount();
    int m=getLineCountVendor();
    cout<<m<<endl;
    host* p = new host[n];
    vendors* v = new vendors[m];

    openfile(p,n);
    openfileVendor(v,m);
    for(int i=0;i<m;i++)
    {
        cout<<v[i].vendor<<"\t"<<v[i].macaddr<<endl;
    }
    compare(p,v,n,m);

}
int getLineCount ()
    {
        ifstream fin("test.txt");

        int n=0;
        string line;

        while(getline(fin,line))
            n++;

        fin.close();
        return n;
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
void openfile (struct host* p, int n) {
    ifstream fin("test.txt");
    while(!fin.eof())
    {
        for(int i=0;i<n;i++)
        {
            fin >> p[i].ipaddr;
            fin >> p[i].macaddr;
        }

    }
    fin.close();
}
void openfileVendor (struct vendors* v, int n) {
    ifstream fin("test2.txt");
    while(!fin.eof())
    {
        for(int i=0;i<n;i++)
        {
            fin >> v[i].macaddr;
            fin >> v[i].vendor;
        }

    }
    fin.close();
}

void compare (struct host* p, struct vendors* v, int n, int m)
{
    list* l = new list[10];
    int var=0, car;
    int Ran[sizeof(host)];
    
    for(int i=0;i<n;i++)
    {
        for(int j=0;j<m;j++)
        {
            if(p[i].macaddr.substr(0,8) == v[j].macaddr)
                {
                    l[var].ip=p[i].ipaddr;
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