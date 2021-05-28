/*
waypoint is relative to the ship

if the ship moves, the waypoint moves with it



*/




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

// waypoint vals r relative
// this means u need to change them only when
// the instruction is one of the following
// N S E W L R
let my_waypoint = {
    x: 10,
    y: 1
}

function normalize_vals(ship){
    ship["x"] = (ship["x"] < 0) ? -ship["x"] : ship["x"];
    ship["y"] = (ship["y"] < 0) ? -ship["y"] : ship["y"];
}

function update_waypoint_coords(waypoint, direction, value){
    switch(direction){
        case 'N':
            waypoint["y"] += value;
            break;
        case 'E':
            waypoint["x"] += value;
            break;
        case 'S':
            waypoint["y"] -= value;
            break;
        case 'W':
            waypoint["x"] -= value;
            break;
    }
}

function update_waypoint_direction(waypoint, direction, value){
    value = value % 360; // max 360 degrees
    switch(value){
        case 0:
            break;
        case 270:
            // invert L with R and R with L and go to case 90
            direction = (direction == 'L') ? 'R' : 'L';
        case 90:
            {
            let x = waypoint["x"];
            let y = waypoint["y"];
            // here do stuff, switch direction
            // 10 EAST, 4 NORTH;
            // R => 4 EAST, -10 NORTH
            // L => -4 EAST, 10 NORTH
            switch(direction){
                case 'L':
                    {
                        /* if(x >= 0 && y >= 0){ */
                            waypoint["x"] = -y;
                            waypoint["y"] = x;
                        /* }
                        if(x <= 0 && y >= 0){
                            waypoint["x"] = -y;
                            waypoint["y"] = x;
                        }
                        if(x <= 0 && y <= 0){
                            waypoint["x"] = -y;
                            waypoint["y"] = x;
                        }
                        if(x >= 0 && y <= 0){
                            waypoint["x"] = -y;
                            waypoint["y"] = x;
                        } */
                    }
                    break;
                case 'R':
                    waypoint["y"] = -x;
                    waypoint["x"] = y;
                    break;
            }
            }
            
            break;
        case 180:
            // here L and R r the same, invert values ig?
            waypoint["x"] = -waypoint["x"];
            waypoint["y"] = -waypoint["y"];
            break;
    }
}

function update_ship_coords(waypoint, ship, value){
    let x_increment = waypoint["x"] * value;
    let y_increment = waypoint["y"] * value;
    ship["x"] += x_increment;
    ship["y"] += y_increment;
}

function travel(ship, waypoint, instruction, value){
    let facing = ship["facing"];
    switch(instruction){
        case 'F':
            update_ship_coords(waypoint, ship, value);
            break;
        case 'R':
        case 'L':
            update_waypoint_direction(waypoint, instruction, value);
            break;
        default:
            update_waypoint_coords(waypoint, instruction, value);
            break;
    }
}


for(const full_ins of instructions){
    travel(my_ship, my_waypoint, full_ins["instruction"], full_ins["value"]);
    // console.log(my_ship["x"], my_ship["y"]);
}

normalize_vals(my_ship);
console.log(my_ship["x"] + my_ship["y"]);