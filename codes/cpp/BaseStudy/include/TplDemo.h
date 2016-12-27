#ifndef TPLDEMO_H
#define TPLDEMO_H

template <class T1, typename T2>

class TplDemo
{
    public:
        TplDemo();
        virtual ~TplDemo();

        void say(T1);
        void show(T2);
    protected:
    private:
};

#endif // TPLDEMO_H
