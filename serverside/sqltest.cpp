#include <search.hpp>

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
void insertion(MYSQL* conn)
{
    int qstate=0;
    string query;
    query="DELETE FROM active_ips";
    const char* q=query.c_str();
    qstate = mysql_query(conn,q);

}

int main()
{
    MYSQL* conn=connectiondb();
    insertion(conn);
    int qstate=0;

}

