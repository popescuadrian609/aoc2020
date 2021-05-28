const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {encoding: "utf-8", flag:"r"});

file_contents = file_contents.split(/\r\n|\n/);

let tree_count = 0;

for(let i = 0, j = 0; i < file_contents.length; i += 1, j += 3){
    if(file_contents[i][j % file_contents[i].length] == '#')tree_count++;
}
console.log(tree_count);