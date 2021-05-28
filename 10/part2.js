const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {encoding: "utf-8", flag:"r"});

let nums = file_contents
            .split(/\r\n/gm)
            .map((val) => parseInt(val))
            .concat(0)
            .sort((a,b) => a-b)

let adapters = {}

let min = 0;
let max = nums[nums.length - 1] + 3;

function findPossibleConnections(arr, index, obj){
    let max_index = arr.length - 1;
    let val = arr[index];
    if(!obj.hasOwnProperty(val))obj[val] = [];
    for(let i = 1; i <= 3 && index + i <= max_index; i++){
        // let node = {
        //     val: arr[index+i],
        //     visited: false
        // }
        if(arr[index+i] - val <= 3)obj[parseInt(val)].push(arr[index+i]);
    }
}

for(let i = 0; i < nums.length; i++){
    let val = nums[i];
    findPossibleConnections(nums, i, adapters);
}

console.log(adapters);

for(let adapter_key in adapters){
    let following_adaptors = adapters[adapter_key];
    adapters[adapter_key] = {
        next: following_adaptors,
        value: 0
    }
}

for(let i = Object.keys(adapters).length-1; i>=0; i--){
    let current_adapter_key = Object.keys(adapters)[i];
    let current_adapter = adapters[current_adapter_key];
    if(current_adapter["next"].length == 0){
        current_adapter["value"] = 1;
    }else{
        let temp_val = 0;
        for(let j = 0; j < current_adapter["next"].length; j++){
            let current_next = current_adapter["next"][j];
            temp_val += adapters[current_next]["value"];
        }
        current_adapter["value"] = temp_val;
    }
}
console.log(adapters);









function findAllPerms(all_adapters_obj, index, count_obj/* , debug_arr = [] */){
    // let copy_debug_arr = JSON.parse(JSON.stringify(debug_arr));
    let curr_adapter = all_adapters_obj[index];
    // copy_debug_arr.push(index);
    if(curr_adapter.length == 0){
        count_obj.counter++;
        return;
    }
    for(let i = 0; i < all_adapters_obj[index].length; i++){
        let next_adapter = all_adapters_obj[index][i];
        // console.log(next_adapter);
        // copy_debug_arr.push(next_adapter);
        findAllPerms(all_adapters_obj, next_adapter, count_obj/* , copy_debug_arr */);
    }
}

function factorial(number){
    if(number == 1) return 1;
    return number * factorial(number-1);
}
// console.log(factorial(result-1));
// findAllPerms(adapters, 0, counter_obj);
// don t use this shit, it s like mining bitcoin


// console.log(counter_obj.counter);