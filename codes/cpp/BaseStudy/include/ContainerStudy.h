#ifndef CONTAINERSTUDY_H
#define CONTAINERSTUDY_H

#include <vector>
#include <iostream>

class ContainerStudy
{
    public:
        ContainerStudy(char *);
        virtual ~ContainerStudy();
        void vectorDemo();
        char *getDescription();
    protected:
    private:
        char *description;
};

#endif // CONTAINERSTUDY_H
