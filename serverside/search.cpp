#include "search.hpp"

char HOST[] = "localhost";
char USER[] = "root";
char PASS[] = "medis";
char NAME[] = "camapp";

MYSQL* connectiondb()
{
    MYSQL* conn;
    conn = mysql_init(0);
    conn = mysql_real_connect(conn, HOST, USER, PASS, NAME, 3306, NULL, 0);
    if(conn){
        return conn;
    }
    else{
        return conn;
    }
}

void scan()
{
    string comm="nmap -n -sP 192.168.0.1/24 | awk '/Nmap scan report/{printf $5;printf \" \";getline;getline;print $3;}' > scan";
    system(comm.c_str());
}

int getLineCount ()
{
    ifstream fin("scan");

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

void returnOutput(struct list* l, int jim)
{
    ofstream out("links");
    for(int i=0;i<jim;i++)
    {
        out<<l[i].addr<<endl;
    }
    out.close();
}

void assignAddr (struct list* l, int var)
{
    //string rtsp="http://admin:admin@";
    //string dahua="/cam/realmonitor?channel=1&subtype=1";
    int jim = 0;
    for(int i=0;i<var;i++)
    {
        if(l[i].vendor == "Dahua")
            {
                l[i].addr=l[i].ip;
                jim++;
            }

    }

    for(int i=0;i<jim;i++)
    {
        cout<<l[i].addr<<endl;
    }

    returnOutput(l,jim);
}
void insertion(MYSQL* conn,struct list* l, int var)
{
    int qstate=0;
    stringstream ss;
    string query;
    query="TRUNCATE TABLE active_ips";
    const char* q=query.c_str();
    qstate = mysql_query(conn,q);

        for(int i=0;i<var;i++)
    {
        ss << "INSERT INTO active_ips (ipaddr,vendor) VALUES ('"+l[i].ip+"','"+l[i].vendor+"')";
        query = ss.str();
        q=query.c_str();
        qstate = mysql_query(conn,q);
    }

}
void compare (MYSQL* conn, struct host* p, struct vendors* v, int n, int m)
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
    //assignAddr(l,var);
    insertion(conn,l,var);
}

int main() {

    MYSQL* conn=connectiondb();
    scan();
    //sleep_for(7s);

    int n=getLineCount();
    int m=getLineCountVendor();

    host* p = new host[n];
    vendors* v = new vendors[m];

    openfile(p,n);
    openfileVendor(v,m);
    compare(conn,p,v,n,m);

}
