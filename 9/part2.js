let range = 25;
let file_name = '/input.txt';

const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + file_name, {encoding: "utf-8", flag:"r"});

file_contents = file_contents.split(/\r\n/gm);

for(let i = 0; i < file_contents.length; i++){
    file_contents[i] = parseInt(file_contents[i]);
}

let nums = [...file_contents.slice(0, range)];

function findIfAny(arr, val){
    for(let i = 0; i < arr.length - 1; i++){
        for(let j = 1; j < arr.length; j++){
            if(arr[i] + arr[j] == val)return true;
        }
    }
    return false;
}


let invalid_number;
let invalid_no_index;


// find invalid number

for(let i = range; i < file_contents.length; i++){
    if(!findIfAny(nums, file_contents[i])){
        invalid_number = file_contents[i];
        invalid_no_index = i;
        break;
    } else {
        nums.shift();
        nums.push(file_contents[i]);
    }
}

// create an array with the numbers less than it, which are also before the number

let nums_b4_no = [];
for(let i = 0; i < invalid_no_index; i++){
    let curr_number = file_contents[i];
    if(curr_number < invalid_number){
        nums_b4_no.push(curr_number);
    }
}
// nums_b4_no = [...file_contents.slice(0, invalid_no_index)];
let start = -1, end = -1;
for(let i = 0; i < nums_b4_no.length - 1; i++){
    let sum = nums_b4_no[i];
    let found = false;
    for(let j = i+1; j < nums_b4_no.length; j++){
        sum += nums_b4_no[j];
        if(sum == invalid_number){
            // contaguous set found
            console.log('AAAAAAAAAAAAAA')
            start = i;
            end = j+1;
            found = true;
            break;
        }
        if(sum > invalid_number){
            break;
        }
    }
    if(found == true)break;
}
// ERROR IN THE ABOVE LOOP


let min = nums_b4_no[start], max = nums_b4_no[start]
if(start != -1 && end != -1){
    for(let i = start; i < end; i++){
        if(nums_b4_no[i] < min)min = nums_b4_no[i];
        if(nums_b4_no[i] > max)max = nums_b4_no[i];
    }
}
if(min != max){
    console.log(min + max);
}