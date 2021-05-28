const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {encoding: "utf-8", flag:"r"});

file_contents = file_contents.split(/\r\n|\n/);

let counter = 0;

function checkIfValid(min, max, char, str){
    let isValid = true;

    if(str[min] == char && str[max] == char)isValid = false;
    if(str[min] != char && str[max] != char)isValid = false;
    return isValid;
}


for(let i = 0; i < file_contents.length; i++){
    let line = file_contents[i].split(/ /);
    let min = parseInt(line[0].split('-')[0]) - 1;
    let max = parseInt(line[0].split('-')[1]) - 1;
    let char = line[1][0];
    let string = line[2];
    checkIfValid(min, max, char, string) ? counter++ : undefined;
}

console.log(counter);