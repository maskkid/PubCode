#include <iostream>
#include <string>
#include <vector>
#include <boost/program_options.hpp>

using namespace std;
using namespace boost;

int main(int argc, char* argv[])
{
    program_options::options_description opts("options");
    opts.add_options()
        ("help,h", "help")
        ("server,s", program_options::value<string>(), "progam server settings")
        ("port,p", program_options::value<int>(), "program server port")
        ("fork", program_options::value<int>(), "program fork num");
    program_options::variables_map argmap;
    program_options::store(parse_command_line(argc, argv, opts), argmap);
    program_options::notify(argmap);

    if(argmap.count("help") or !argmap.count("server") or !argmap.count("port")) {
        cout << opts << endl;
        cout << "args error" << endl;
        return 1;
    }

    cout << "server : " << argmap["server"].as<string>() << endl;
    cout << "port : " << argmap["port"].as<int>() << endl;
    
    if(argmap.count("fork")) cout << "fork : " << argmap["fork"].as<string>() << endl;

    return 0;
}
