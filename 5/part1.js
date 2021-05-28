const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {encoding: "utf-8", flag:"r"});

let biggest_seat_ID = -1;

file_contents = file_contents.split('\r\n');

for(let i = 0; i < file_contents.length; i++){
    let line = file_contents[i];
    //console.log(line);
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
    if(line[6] == 'F'){/* console.log(row_min); */row_max = row_min;}
    else {row_min = row_max; /* console.log(row_max); */}


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
    if(current_seat_ID > biggest_seat_ID)biggest_seat_ID = current_seat_ID;
}

// console.log(biggest_seat_ID);

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