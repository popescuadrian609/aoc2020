const fs = require('fs');
const assert = require('assert');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {
    encoding: "utf-8",
    flag: "r"
});

let nums = file_contents
                    .split(',')
                    .map((num) => parseInt(num));

function find(last_num_pos){
    const all_the_nums = Array(last_num_pos);
    for(let i = 0; i < nums.length; i++){
        let num = nums[i]
        all_the_nums[num] = i+1;
    }

    let curr = nums[nums.length - 1];
    for(let i = nums.length; i < last_num_pos; i++){
        if(!all_the_nums[curr]){
            all_the_nums[curr] = i;
            curr = 0;
        } else {
            let last_num = all_the_nums[curr];
            all_the_nums[curr] = i;
            curr = i - last_num;
        }
    }
    return curr;
}

console.log(find(3*1e7));

