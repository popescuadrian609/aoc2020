/* 1 = 3 * 0 + 1 
4 = 3 * 1 + 1
7 = 3 * 2 + 1
10 = 3  * 3 + 1
...
19 = 3 * 6 + 1


2 = 3 * 0 + 2
6 = 3 * 1 + 3
10 = 3 * 2 + 4
...
26 = 3 * 6 + 8


 */

 let array = [];
 // CACHE NUMS IN AN ARRAY
 for(let i = 0; i < 100; i++){
    array.push(3 * i + i+2);
 }

 // get the pos of the value in the cached array
 // you can use binary search, it s faster
 let pos;
 let value = 34;
 for(let i = 0; i < array.length; i++){
     if(array[i] == value){
         pos = i;
         break;
     }
 }

 let final_number = 3 * pos + 1;

 console.log(value, final_number)