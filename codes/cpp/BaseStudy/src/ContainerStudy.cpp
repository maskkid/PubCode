#include "ContainerStudy.h"

ContainerStudy::ContainerStudy(char *des)
 //   :description(des)
{
    description = des;
    //ctor
    cout << "======== " << this.getDescription() << " ===========" << endl;
}

ContainerStudy::~ContainerStudy()
{
    //dtor
}

void ContainerStudy::vectorDemo() {

}

char *ContainerStudy::getDescription() {
    return this.description;
}
