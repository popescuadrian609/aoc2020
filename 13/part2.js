const { time } = require('console');
const fs = require('fs');
const { normalize } = require('path');

let file_contents = fs.readFileSync(__dirname + '/test_input.txt', {
    encoding: "utf-8",
    flag: "r"
});

let bus_data = file_contents
    .split(/\r\n/gm)

let timestamp = parseInt(bus_data[0]);

let data = bus_data[1]
            .slice(0)
            .split(',')
            .map(num => {
                return isNaN(num) ? num : parseInt(num);
            });


let my_times = [];
let my_buses = [];
for(let i = 0; i < data.length; i++){
    if(!isNaN(data[i])){
        my_buses.push(data[i]);
        my_times.push(i);
    }
}

console.log("Modulus numbers", my_buses);
// console.log("Remainders", my_times);

for(let i = 0, pivot = my_times[my_times.length - 1]; i < my_times.length; i++){
    my_times[i] = parseInt(-(my_times[i] - pivot));
}
// for(let i = 0; i < my_times.length; i++){
//     my_times[i] = (my_buses[i] - my_times[i]) % my_buses[i];
// }


console.log("Remainders", my_times);
let remainders = my_times; // This is ri
let allOtherDivisors = []; // This is Ni
let eachOnesSolution = [] // idk how to call this, xi

let N = my_buses.reduce((a, b) => a*b);

for(let i = 0; i < remainders.length; i++){
    allOtherDivisors.push(N / my_buses[i]);
}
console.log("N", N);
console.log("Ni's", allOtherDivisors);


function inverse(Ni, mod){
    let mod0 = mod;
    let t, q;

    let x0 = 0, x1 = 1;

    if(mod == 1){
        return 0;
    }

    while(Ni > 1){
        q = Ni / mod;
        t = m;
        m = Ni % mod, Ni = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }
    if(x1 < 0)
    x1 += mod0;

    return x1;
}


function findingEachX(N_arr, Solution_arr, Modulus_arr){
    // N_arr[i] xi = 1 (mod Modulus_arr[i]);
    if(N_arr.length != Modulus_arr.length)return;

    for(let i = 0; i < N_arr.length; i++){
        if(Modulus_arr[i] == 0){
            Solution_arr.push(0);
            continue;
        }
        let solution = 1;
        let intermediary = N_arr[i] % Modulus_arr[i];
        if(intermediary == 1){
            Solution_arr.push(1);
            continue;
        }
        for(; (intermediary * solution) % Modulus_arr[i] != 1 && solution < 10; solution++){
        }
        Solution_arr.push(solution);
    }
}

inverse(allOtherDivisors, eachOnesSolution, my_buses)

let sum = 0;
for(let i = 0; i < my_buses.length; i++){
    sum += remainders[i] * allOtherDivisors[i] * eachOnesSolution[i];
}
final_result = sum % N;
console.log(sum);
console.log(final_result - my_times[0]);