const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {encoding: "utf-8", flag:"r"});

file_contents = file_contents.split('\r\n');

let seats_array = [];

for(let i = 0; i < file_contents.length; i++){
    let line = file_contents[i];

    let current_seat_ID;

    let row_min = 0, row_max = 127;
    let col_min = 0, col_max = 7;

    for(let char_index = 0; char_index < 7; char_index++){
        switch(line[char_index]){
            case 'F':
                row_max = (row_max + row_min + 1) / 2 - 1;
                break;
            case 'B':
                row_min = (row_max + row_min + 1) / 2;
        }
    }
    if(line[6] == 'F'){row_max = row_min;}
    else {row_min = row_max;}


    for(let char_index = 7; char_index < line.length; char_index++){
        switch(line[char_index]){
            case 'R':
                col_min = (col_max + col_min + 1) / 2;
                break;
            case 'L':
                col_max = (col_max + col_min + 1) / 2 - 1;
                break;
        }
    }
    if(line[line.length - 1] == 'R'){col_min = col_max;}
    else {col_max = col_min;}

    current_seat_ID = row_min * 8 + col_min;


    seats_array.push(current_seat_ID);
}

let seats_set = new Set(seats_array);

/* for(let i = 0; i < seats_array.length - 1; i++){
    for(let j = 1; j < seats_array.length; j++){
        let result = seats_array[i] - seats_array[j];
        result = (result < 0) ? -result : result;
        if(result == 2){
            if(seats_set.has(seats_array[i]))
            console.log(`${seats_array[i] + 1}`);
    }
    }
} */

let missing_seats = [];
for(let i = 0; i < 855; i++){
    if(!seats_set.has(i)){
        missing_seats.push(i);
        console.log(i);
    }
}


/*
FBFBBFFRRL
44

F
=> 0 - 63
B
=> 32 - 63
F
=> 32 - 47
B
=> 40 - 47
B
=> 44 - 47
F
=> 44 - 45
F
44

*/