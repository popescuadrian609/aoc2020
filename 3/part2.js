const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {encoding: "utf-8", flag:"r"});

file_contents = file_contents.split(/\r\n|\n/);


let down_offset = [1, 1, 1, 1, 2];
let right_offset = [1, 3, 5, 7, 1];
let results = [];


function get_no_of_trees(lines, down, right){
    let tree_count = 0;
    for(let i = 0, j = 0; i < lines.length; i += down, j += right){
        if(lines[i][j % lines[i].length] == '#')tree_count++;
    }
    return tree_count;
}

for(let i = 0; i < down_offset.length; i++){
    results.push(get_no_of_trees(file_contents, down_offset[i], right_offset[i]));
}

let final_result = 1;
for(let i = 0; i < results.length; i++){
    final_result *= results[i];
}
console.log(final_result);