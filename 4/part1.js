const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {encoding: "utf-8", flag:"r"});

file_contents = file_contents.split(/(\r?\n|\n){2,}/gm);

let counter = 0;

for(let i = 0, line; i < file_contents.length; i++){
    line = file_contents[i];
    let valid = true;
    let attributes = (line.match(/:/g) || []).length;
    let has_cid = line.includes('cid');
    if(attributes != 8){
        if(attributes == 7 && has_cid)valid = false;
        if(attributes < 7)valid = false;
    }
    valid ? counter++ : undefined;
}

console.log(counter);