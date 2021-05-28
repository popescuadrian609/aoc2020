const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {encoding: "utf-8", flag:"r"});

file_contents = file_contents.split(/\r\n/gm);

for(let i = 0; i < file_contents.length; i++){
    file_contents[i] = parseInt(file_contents[i]);
}

let nums = [...file_contents.slice(0, 25)];

function findIfAny(arr, val){
    for(let i = 0; i < arr.length - 1; i++){
        for(let j = 1; j < arr.length; j++){
            if(arr[i] + arr[j] == val)return true;
        }
    }
    return false;
}

for(let i = 25; i < file_contents.length; i++){
    if(!findIfAny(nums, file_contents[i])){
        console.log(file_contents[i]);
        break;
    } else {
        nums.shift();
        nums.push(file_contents[i]);
    }
}

