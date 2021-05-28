const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {encoding: "utf-8", flag:"r"});


file_contents = file_contents.split(/\r\n/gm);

let global_acc = 0;

let alr_exec = new Set();

let instructions = [];
for(let i = 0; i < file_contents.length; i++){
    let line = file_contents[i];
    let curr_instruction = [];
    // if(line.split(' ')[0] == 'nop')continue;
    curr_instruction.push(line.split(' ')[0]);
    curr_instruction.push(parseInt(line.split(' ')[1]));
    instructions.push(curr_instruction);
}
// console.log(instructions);

for(let i = 0; true;){
    let instruction = instructions[i][0];
    let value = instructions[i][1];
    if(alr_exec.has(i))break;
    else alr_exec.add(i);
    if(instruction == 'jmp'){
        i += value;
    } else {
        
        if(instruction == 'nop'){
            i++;
            continue;
        }

        global_acc += value;
        i++;
    }

}
console.log(global_acc);