const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {encoding: "utf-8", flag:"r"});

file_contents = file_contents.split(/\r\n/gm);

let global_acc = 0;

let pair = {
    'jmp': 'nop',
    'nop': 'jmp'
}

function parseInstructions(file_data){
    let instructions = [];
    for(let i = 0; i < file_data.length; i++){
        let line = file_data[i];
        let curr_instruction = [];
        // if(line.split(' ')[0] == 'nop')continue;
        curr_instruction.push(line.split(' ')[0]);
        curr_instruction.push(parseInt(line.split(' ')[1]));
        instructions.push(curr_instruction);
    }
    return instructions;
}

function checkIfNotInfLoop(ins_arr){
    let acc = 0;
    let alr_exec = new Set();
    // let alr_exec_arr = [];
    let isInfinite = false;
    for(let i = 0; true && i < ins_arr.length;){
        let instruction = ins_arr[i][0];
        let value = ins_arr[i][1];
        if(alr_exec.has(i)){
            isInfinite = true;
            break;
        }
        else {
            alr_exec.add(i);
        }
        switch(instruction){
            case 'jmp':
                i += value;
                break;
            case 'acc':
                acc += value;
                i++;
                break;
            case 'nop':
                i++;
                break;
        }
    }

    if(isInfinite == false){console.log(acc);return false;}
    else return true;
}


let ins = parseInstructions(file_contents);
let ins_set = new Set();
let ins_arr = [];

// Execute the code first time and get the stack trace in ins_set

for(let i = 0; true && i < ins.length;){
    let instruction = ins[i][0];
    let value = ins[i][1];
    if(ins_set.has(i)){
        break;
    }
    else {
        ins_arr.push(i);
        ins_set.add(i);
    }
    switch(instruction){
        case 'jmp':
            // ins_jmp.add(i);
            i += value;
            break;
        case 'acc':
            // ins_acc.add(i);
            global_acc += value;
            i++;
            break;
        case 'nop':
            // ins_nop.add(i);
            i++;
            break;
    }
}

// Go back the stack trace (ins_arr) and find 'jmp' and 'nop' instructions
// Edit 1 at a time and try to see if it is not an inf loop (checkIfNotInfLoop function)

for(let i = ins_arr.length - 1; i >= 0; i--){
    let ins_no = ins_arr[i];
    let instruction = ins[ins_no][0];
    // let value = ins[ins_no][1];
    if(!pair.hasOwnProperty(instruction))continue; // make sure we are not on an 'acc' instruction, just skip it
    
    let ins_copy = [...ins];

    ins_copy[ins_no][0] = pair[instruction];

    let isInfinite = checkIfNotInfLoop(ins_copy);

    if(!isInfinite)break;

}