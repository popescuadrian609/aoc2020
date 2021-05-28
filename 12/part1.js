const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {
    encoding: "utf-8",
    flag: "r"
});

let instructions = file_contents
    .split(/\r\n/gm)
    .map((line) => {
        let instruction = line.substring(0, 1);
        let number = parseInt(line.substring(1));
        return {instruction: instruction, value: number};
    });

let my_ship = {
    facing: 'E',
    x: 0,
    y: 0,
}

let way_point = {
    x: 10,
    y: 1
}

function normalize_vals(ship){
    ship["x"] = (ship["x"] < 0) ? -ship["x"] : ship["x"];
    ship["y"] = (ship["y"] < 0) ? -ship["y"] : ship["y"];
}

let direction_change = {
    N : {
        R: 'E',
        L: 'W'
    },
    E: {
        R: 'S',
        L: 'N'
    },
    S: {
        R: 'W',
        L: 'E'
    },
    W: {
        R: 'N',
        L: 'S'
    }

}

/* function rotateShip(ship, direction, value){
    
}
 */

function update_coords(ship, direction, value){
    switch(direction){
        case 'N':
            ship["y"] += value;
            break;
        case 'E':
            ship["x"] += value;
            break;
        case 'S':
            ship["y"] -= value;
            break;
        case 'W':
            ship["x"] -= value;
            break;
    }
}

function update_direction(ship, direction, value){
    value = value % 360; // max 360 degrees
    let loops = value / 90;
    for(let i = 0; i < loops; i++){
        ship["facing"] = direction_change[ship["facing"]][direction];
    }
}

function travel(ship, instruction, value){
    let facing = ship["facing"];
    switch(instruction){
        case 'F':
            update_coords(ship, ship["facing"], value);
            break;
        case 'R':
        case 'L':
            update_direction(ship, instruction, value);
            break;
        default:
            update_coords(ship, instruction, value);
            break;
    }
}


for(const full_ins of instructions){
    travel(my_ship, full_ins["instruction"], full_ins["value"]);
    // console.log(my_ship["x"], my_ship["y"]);
}

normalize_vals(my_ship);
console.log(my_ship["x"] + my_ship["y"]);