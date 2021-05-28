const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {encoding: "utf-8", flag:"r"});

file_contents = file_contents.split(/(\r?\n|\n){2,}/gm);

let counter = 0;

for(let i = 0; i < file_contents.length; i++){
    let line = file_contents[i];

    line = line.replace(/\r?\n/gm, '');
    
    let answers = new Set();
    
    for(let j = 0; j < line.length; j++){
        answers.add(line[j]);
    }
    counter += answers.size;
}

console.log(counter);