#include <iostream>
#include <time.h>
using namespace std;
bool validateNumber(unsigned long long int number, int arr1[], short int arr2[], short int length){
    for(int i = 1; i < length; i++){
        int curr_bus = arr1[i];
        int curr_time = arr2[i];
        if(((number + curr_time) % curr_bus) != 0)return false;
    }
    return true;
}
int main()
{
    short int length = 9;
    int my_buses[] = {911,827,41,37,29,23,19,17,13};
    short int my_times[] = {0,31,-41,-6,29,23,50,14,13};
    unsigned long long int number = 100000000000000;
    unsigned long long int initial_number = number;
    unsigned long long int milestone = number / 10;
    while(number % my_buses[0] != 0)number++;
    clock_t tic = clock();
    int i = 1;
    while(!validateNumber(number, my_buses, my_times, length) && number < initial_number*10){
        number += my_buses[0];
        if(number >= initial_number + milestone * i){
            i++;
            cout << "MILESTONE " << i-1 << " " << number;
        }
    }
    clock_t toc = clock();
    cout << "TIME IS " << (double)(toc - tic) / CLOCKS_PER_SEC << endl;
    cout << number;
    return 0;
}
