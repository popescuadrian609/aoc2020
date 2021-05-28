const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {
    encoding: "utf-8",
    flag: "r"
});

let bus_data = file_contents
    .split(/\r\n/gm)
let instructions = [];

for(let i = 0; i < bus_data.length; i++){
    let instruction = {
        left: {
            name: '',
            index: -1
        },
        right: {
            value: 0
        }
    };
    
    instruction["left"]["name"] = (bus_data[i].substr(0, 4) == 'mask') ? 'mask' : 'mem';
    instruction["right"]["value"] = bus_data[i].split(' = ')[1];
    if(instruction["left"]["name"] == "mem"){
        const match = bus_data[i].match(/\[(.+?)\]/);
        instruction["left"]["index"] = match == null ? null : match[1];
    }
    instructions.push(instruction);
}


function ntob(num){
    num = parseInt(num);
    let length = 36;
    let bits = new Array(36).fill(0);
    for(let i = bits.length-1; Math.floor(num) != 0; i--){
        bits[i] = num % 2;
        num = Math.floor(num/2);
    }
    return bits.join('');
}

function bton(bits){
    return (typeof(bits) == "string") ? parseInt(bits, 2) : (typeof(bits) == "number") ? bits: parseInt(bits.join(''), 2);
}

function normalizeMask(mask){
    if(typeof(mask) != "string")return;
    let mask_obj = {};
    for(let i = 0; i < mask.length; i++){
        if(mask[i] == 'X')continue;
        mask_obj[i] = parseInt(mask[i]);
    }
    return mask_obj;
}

let container = {};

let mask = "";
for(let i = 0; i < instructions.length; i++){
    let instruction = instructions[i];
    switch(instruction["left"]["name"]){
        case 'mask':
            mask = normalizeMask(instruction["right"]["value"]);
            break;
        case 'mem':
            {
                let container_num = ntob(instruction["right"]["value"]).split('');
                let index = instruction["left"]["index"];
                for(const mask_index of Object.keys(mask)){
                    container_num[mask_index] = mask[mask_index];
                }
                container_num = bton(container_num);
                container[index] = container_num;
            }
            break;
        default:
            break;
    }
}

let sum = 0;
for(const index of Object.keys(container)){
    sum += bton(container[index]);
}

console.log(sum)