const fs = require('fs');
const assert = require('assert');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {
    encoding: "utf-8",
    flag: "r"
});

let bus_data = file_contents
    .split(/\r\n/gm)


function findSum(address_container) {
    let sum = 0;
    for (const index of Object.keys(address_container)) {
        sum += bton(container[index]);
    }
    return sum;
}

function ntob(num) {
    // if the num is as a string he ll still try to convert it to bits, careful
    if (typeof (num) == 'object' || Array.isArray(num)) return num;
    num = parseInt(num);
    let length = 36;
    let bits = new Array(36).fill(0);
    for (let i = bits.length - 1; Math.floor(num) != 0; i--) {
        bits[i] = num % 2;
        num = Math.floor(num / 2);
    }
    return bits;
}

function bton(bits) {
    return (typeof (bits) == "string") ? parseInt(bits, 2) : (typeof (bits) == "number") ? bits : parseInt(bits.join(''), 2);
}

function rawAddressFinder(address_index, mask) {
    address_index = (typeof (address_index) == 'string') ? address_index.split('') : address_index;
    mask = (typeof (mask) == 'string') ? mask.split('') : mask;
    for (let i = 0; i < mask.length; i++) {
        switch (mask[i]) {
            case 'X':
                address_index[i] = 'X';
                break;
            case '1':
                address_index[i] = '1';
                break;
            default:
                break;
        }
    }
    return address_index;
}

function addressWriter(address_container, raw_address, value) {
    // get the positions of x so that you can know what combinations to make
    // also make sure ur pos r in ascending order
    if(typeof(raw_address) == 'string')raw_address = raw_address.split('');
    let x_positions = [];
    for (let i = 0; i < raw_address.length; i++) {
        if (raw_address[i] == 'X') x_positions.push(i);
    }
    
    let addresses = [];
    getAllAddresses(addresses, raw_address, x_positions);


    // transform addresses to strings from arrays, cause anyways an object cant have an array as key afaik, or can it? idk idc

    for (let i = 0; i < addresses.length; i++) {
        let address = addresses[i].join('');
        address_container[address] = value;
    }
}

function getAllAddresses(indexes, normal_address, positions, index = 0) {
    let address = JSON.parse(JSON.stringify(normal_address));
    if (index == positions.length - 1) {
        address[positions[index]] = '0';
        indexes.push(JSON.parse(JSON.stringify(address)));
        address[positions[index]] = '1';
        indexes.push(JSON.parse(JSON.stringify(address)));
        return;
    }
    address[positions[index]] = '0';
    getAllAddresses(indexes, address, positions, index + 1);
    address[positions[index]] = '1';
    getAllAddresses(indexes, address, positions, index + 1);
}

let instructions = [];

for (let i = 0; i < bus_data.length; i++) {
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
    let temp_val = bus_data[i].split(' = ')[1];
    instruction["right"]["value"] = instruction["left"]["name"] == 'mem' ? ntob(temp_val) : temp_val.split(''); //bus_data[i].split(' = ')[1];
    if (instruction["left"]["name"] == "mem") {
        const match = bus_data[i].match(/\[(.+?)\]/);
        instruction["left"]["index"] = (match == null) ? null : ntob(parseInt(match[1])).join('');
    }
    instructions.push(instruction);
}
// console.log(instructions);
let container = {};

let mask = "";
for (let i = 0; i < instructions.length; i++) {
    let instruction = instructions[i];
    switch (instruction["left"]["name"]) {
        case 'mask':
            mask = instruction["right"]["value"];
            break;
        case 'mem': {
            let value = instruction["right"]["value"];
            let index = instruction["left"]["index"];
            addressWriter(container, rawAddressFinder(index, mask), value);
        }
        break;
    default:
        break;
    }
} 
let sum = findSum(container);
console.log(sum);