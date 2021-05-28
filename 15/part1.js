const fs = require('fs');
const assert = require('assert');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {
    encoding: "utf-8",
    flag: "r"
});

// let bus_data = file_contents
//     .split(/\r\n/gm)
function findNextNumber(container, num, counter){
    if(!container.hasOwnProperty(num)){
        container[num] = counter;
        return 0;

    }else{
        let last_pos = container[num];
        container[num] = counter;
        return counter - last_pos;
    }

    // DONT FORGET TO INCREMENT COUNTER MANUALLY EVERYTIME CAUSE IT PASSES BY VALUE
}

let nums = file_contents.split(',');
let counter = 0;
let nums_obj = {};
let next_number;
let last_number;

for(;counter < nums.length-1; counter++){
    nums_obj[nums[counter]] = counter;
};
next_number = findNextNumber(nums_obj, nums[counter], counter);
counter++;

for(; counter < 2020 - 1; counter++){
    last_number = next_number;
    next_number = findNextNumber(nums_obj, last_number, counter);
}

console.log(next_number);