const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {encoding: "utf-8", flag:"r"});

let nums = file_contents
            .split(/\r\n/gm)
            .map((val) => parseInt(val))
            .sort((a,b) => a-b);

let jolts = {
    1: 1,
    2: 0,
    3: 1
}


for(let i = 1, prev_num = nums[0]; i < nums.length; i++){
    let curr_num = nums[i];
    switch(curr_num - prev_num){
        case 1:
            jolts[1]++;
            break;
        case 2:
            jolts[2]++;
            break;
        case 3:
            jolts[3]++;
            break;
        default:
            break;
    }
    prev_num = curr_num;
}


console.log(jolts[1] * jolts[3]);