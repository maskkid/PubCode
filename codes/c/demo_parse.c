#include <iostream.h>

#define MAXLINE 1000

static int parse_uri(char *uri, char *filename, char *cgiargs) 
{
    char *ptr;
    char tmpcwd[MAXLINE];
    strcpy(tmpcwd,cwd);
    strcat(tmpcwd,"/");

    if (!strstr(uri, "cgi-bin")) 
    {  /* Static content */
	strcpy(cgiargs, "");
	strcpy(filename, strcat(tmpcwd,Getconfig("root")));
	strcat(filename, uri);
	if (uri[strlen(uri)-1] == '/')
	    strcat(filename, "home.html");
	return 1;
    }
    else 
    {  /* Dynamic content */
	ptr = index(uri, '?');
	if (ptr) 
	{
	    strcpy(cgiargs, ptr+1);
	    *ptr = '\0';
	}
	else 
	    strcpy(cgiargs, "");
	strcpy(filename, cwd);
	strcat(filename, uri);
	return 0;
    }
}

int main() {
    char *url[] = "http://www.baidu.com?a=a&b=b&c=c";
    char *filename[];
    char *args[];
    parse_uri(url, filename, args); 
    printf(args, "args::%s", args);
    return 0;
}
