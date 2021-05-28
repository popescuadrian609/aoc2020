const { time } = require('console');
const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {
    encoding: "utf-8",
    flag: "r"
});

let bus_data = file_contents
    .split(/\r\n/gm)

let timestamp = parseInt(bus_data[0]);

let buses = bus_data[1]
            .slice(0)
            .replace(/x/gi, '')
            .replace(/,{2,}/gi, ',')
            .split(',')
            .map(num => parseInt(num));

let times = [];
for(const bus of buses){
    times.push(Math.ceil(timestamp / bus));
}
for(let i = 0; i < times.length; i++){
    times[i] = times[i] * buses[i];
}
let min = 10e9;
let min_index;
for(let i = 0; i < times.length; i++){
    if(times[i] < min){
        min = times[i];
        min_index = i;
    }
}

console.log(buses[min_index] * (min - timestamp));