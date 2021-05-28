
const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {
    encoding: "utf-8",
    flag: "r"
});

let seats = file_contents
    .split(/\r\n/gm)
    .map(line => Array.from(line));

function printBeautified(bidim_arr){
    let arr_copy = JSON.parse(JSON.stringify(bidim_arr));
    for(let i = 0; i < arr_copy.length; i++){
        let line = arr_copy[i].join('');
        arr_copy[i] = line;
    }
    let str = arr_copy.join('\n');
    console.log(str);
}

function findSeat({seats_arr, y, x, y_increment, x_increment, limits, counters}){
    while((y + y_increment) >= limits["y_min"] &&
            (y + y_increment) <= limits["y_max"] &&
            (x + x_increment) >= limits["x_min"] &&
            (x + x_increment) <= limits["x_max"]){
                y += y_increment;
                x += x_increment;
                if(seats_arr[y][x] == '.')continue;
                else {
                    switch(seats_arr[y][x]){
                        case 'L':
                            counters["free_seats"]++;
                            break;
                        case '#':
                            counters["occupied_seats"]++;
                            break;
                    }
                    break;
                }
            }
}


function findAdjacentSeats(seats_arr, y, x) {
    // a seat can have 8 adjacent seats around it
    //  1   2       3 
    //  4   SEAT    6
    //  7   8       9
    let y_min = 0,
        x_min = 0;
    let y_max = seats_arr.length - 1,
        x_max = seats_arr[y].length - 1;

    let limits = {
        y_min: y_min,
        x_min: x_min,
        y_max: y_max,
        x_max: x_max
    }

    let counters = {
        free_seats: 0,
        occupied_seats: 0
    }

    let x_increments = [-1, 0, 1, -1, 0, 1, -1, 0, 1];
    let y_increments = [-1, -1, -1, 0, 0, 0, 1, 1, 1];

    for(let k = 0, i = y-1; i <= y+1; i++){
        for(let j = x-1; j <= x+1; j++, k++){
            if(i == y && j == x)continue;
            findSeat({seats_arr: seats_arr, y: y, x: x, y_increment: y_increments[k], x_increment: x_increments[k], limits, counters});
        }
    }
    
    let current_seat = seats_arr[y][x];

    switch (current_seat) {
        case 'L':
            if (counters["occupied_seats"] == 0) current_seat = '#';
            break;
        case '#':
            if (counters["occupied_seats"] >= 5) current_seat = 'L';
            break;
        default:
            break;
    }

    return current_seat;
}

function countOccupiedSeats(seats_arr){
    let count = 0;
    for (let y = 0; y < seats_arr.length; y++) {
        for (let x = 0; x < seats_arr[y].length; x++) {
            if(seats_arr[y][x] == '#')count++;
        }
    }
    return count;
}

function computeNextRound(seats_arr){
    let final_arr = JSON.parse(JSON.stringify(seats_arr));
    for (let y = 0; y < seats_arr.length; y++) {
        for (let x = 0; x < seats_arr[y].length; x++) {
            // console.log(findAdjacentSeats(seats, y, x));
            final_arr[y][x] = findAdjacentSeats(seats_arr, y, x);
        }
    }
    return final_arr;
}

let prev_count = -1, count = -1;

do{
    prev_count = count;

    seats = computeNextRound(seats);

    count = countOccupiedSeats(seats);
}while(prev_count != count) 


console.log(count);

// console.log(final_seats);


