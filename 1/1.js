const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {encoding: "utf-8", flag:"r"});

file_contents = file_contents.split(/\r\n|\n/);

for(let i = 0; i < file_contents.length; i++){
    file_contents[i] = parseInt(file_contents[i]);
}


let no1, no2, no3;

for(let i = 0; i < file_contents.length - 2; i++){
    for(let j = i + 1; j < file_contents.length - 1; j++){
        for(let k = j + 1; k < file_contents.length; k++){
            if(file_contents[i] + file_contents[j] + file_contents[k] == 2020){
                no1 = file_contents[i];
                no2 = file_contents[j];
                no3 = file_contents[k];
            }
        }
    }
}

console.log(no1 * no2 * no3);