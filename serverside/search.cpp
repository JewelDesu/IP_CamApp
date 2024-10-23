#include "search.hpp"

//extern vector<string> ipaddrs;
//extern vector<string> macaddrs;

void scan()
{
    string d = "" "";
    string comm="nmap -n -sP 192.168.0.1/24 | awk '/Nmap scan report/{printf $5;printf \" \";getline;getline;print $3;}' > scan";
    system(comm.c_str());
}

void assignAddr (struct list* l, int var)
{
    string rtsp="rtsp://admin:L279DDDC@";
    string dahua=":554/cam/realmonitor?channel=1&subtype=1";
    int jim = 0;
    for(int i=0;i<var;i++)
    {
        if(l[i].vendor == "Dahua")
            {
                l[i].addr=rtsp + l[i].ip + dahua;
                jim++;
            }

    }

    for(int i=0;i<jim;i++)
    {
        cout<<l[i].addr<<endl;
    }

    returnOutput(l,jim);
}

int getLineCount ()
{
    ifstream fin("htt");

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

void openfile (struct host* p, int n) 
{
    ifstream fin("scan");
    int t=1;
    while(!fin.eof())
    {
        for(int i=0;i<n;i++)
        {
            fin >> p[i].ipaddr;
            fin >> p[i].macaddr;
            //inserting(head, p[i].ipaddr, p[i].macaddr);
            t++;
        }

    }
    fin.close();
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

void compare (struct host* p, struct vendors* v, int n, int m)
{
    list* l = new list[10];
    int var=0;
    
    
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
int returnOutput(struct list* l, int jim)
{
    ofstream out("links");
    for(int i=0;i<jim;i++)
    {
        out<<l[i].addr<<endl;
    }
    out.close();
}
int main() {
    scan();
    sleep_for(7s);

    int n=getLineCount();
    int m=getLineCountVendor();

    host* p = new host[n];
    vendors* v = new vendors[m];

    openfile(p,n);
    openfileVendor(v,m);
    compare(p,v,n,m);

}