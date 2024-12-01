#include "search.hpp"
#define BUFFER 100
static int connectiondb(const char* s)
{
    sqlite3* DB;
    int exit = 0;

    exit = sqlite3_open(s,&DB);

    sqlite3_close(DB);
    return 0;
}

static int createTable(const char* s)
{
    sqlite3* DB;
    string sql = "CREATE TABLE active_ips("
        "ID INTEGER PRIMARY KEY, "
        "ipaddr TEXT NOT NULL, "
        "vendor TEXT NOT NULL);";

    
        int exit = 0;
        exit = sqlite3_open(s,&DB);

        char* messaggeError;
        exit = sqlite3_exec(DB, sql.c_str(),NULL,0,&messaggeError);

        if (exit != SQLITE_OK) {
            cerr << "Error creating table" << endl;
            sqlite3_free(messaggeError);
        } else 
        	cout<<"good"<<endl;
        sqlite3_close(DB);
    
    return 0;
}

void scan()
{
    string ipaddr;
    FILE *pipe;
    char buffer[BUFFER];
    pipe= popen("ip route | grep default | awk '{print $3}'","r");
    if(pipe == NULL){cout<<"bad";}
    else{while (fgets(buffer, BUFFER, pipe) != NULL){
    string ping (buffer,11);
    ipaddr = ping;
    }}

    pclose(pipe);

    string comm="sudo nmap -n -sP "+ipaddr+"/24 | awk '/Nmap scan report/{printf $5;printf \" \";getline;getline;print $3;}' > scan";
    //cout<<comm<<endl;
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
void insertion(const char* s,struct list* l, int var)
{
    sqlite3* DB;
    char* messaggeError;

    int exit = sqlite3_open(s,&DB);
    string query="DELETE FROM active_ips";
    sqlite3_exec(DB,query.c_str(),NULL,0, &messaggeError);
    string sql;
    const char* q=query.c_str();

        for(int i=0;i<var;i++)
    {
        sql="INSERT INTO active_ips (ipaddr,vendor) VALUES ('"+l[i].ip+"','"+l[i].vendor+"');";
        exit = sqlite3_exec(DB,sql.c_str(),NULL,0, &messaggeError);
    }
    if (exit != SQLITE_OK) {
        cerr << "error insert" <<endl;
        sqlite3_free(messaggeError);
    }
}
void compare (const char* s, struct host* p, struct vendors* v, int n, int m)
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
    insertion(s,l,var);
}

int main() {

    sqlite3* DB;
    const char* dir = "../webapp/camapp.db";
    connectiondb(dir);
    createTable(dir);
    scan();
    //sleep_for(7s);

    int n=getLineCount();
    int m=getLineCountVendor();

    host* p = new host[n];
    vendors* v = new vendors[m];

    openfile(p,n);
    openfileVendor(v,m);
    compare(dir,p,v,n,m);

}
