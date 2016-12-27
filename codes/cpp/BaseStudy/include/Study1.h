#ifndef STUDY1_H
#define STUDY1_H

class Study1
{
    public:
        Study1(int x, int y, int z);//:a(x),b(y),c(z) {};
        //Study1(){};
        int say(void);
        virtual ~Study1();
    private:
        int a;
        int b;
        int c;
};

#endif // STUDY1_H
