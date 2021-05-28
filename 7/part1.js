const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {encoding: "utf-8", flag:"r"});

file_contents = file_contents.split(/(\r?\n|\n)/gm);

let bags = {};

for(let i = 0; i < file_contents.length; i++){
    let curr_bag_obj = {};
    let line = file_contents[i];
    if(!line.includes('contain'))continue;
    let bag_name = line.split('contain')[0].trim(); bag_name = bag_name.substring(0, bag_name.length-5);
    let contained_bags_array = line.split('contain')[1].trim(); contained_bags_array = contained_bags_array.substring(0, contained_bags_array.length-1);
    contained_bags_array = contained_bags_array.split(',');
    for(let j = 0; j < contained_bags_array.length; j++){
        let full_bag = contained_bags_array[j].trim().split(' ');
        let number_of_bags = full_bag[0];
        if(number_of_bags == 'no')continue;
        number_of_bags = (number_of_bags == 'no') ? 0 : parseInt(number_of_bags);
        let curr_contained_bag = "";
        for(let k = 1; k < full_bag.length - 1; k++){
            curr_contained_bag += full_bag[k] + ' ';
        }
        curr_contained_bag = curr_contained_bag.trim();
        curr_bag_obj[curr_contained_bag] = number_of_bags;
    }
    bags[bag_name] = curr_bag_obj;
}

let count = 0;
let wanted_bag = "shiny gold";

let bags_that_are_valid = new Set();
for(const key of Object.keys(bags)){
    if(bags[key].hasOwnProperty(wanted_bag)){
        bags_that_are_valid.add(key);
        // console.log(key);
        // count++;
    }
}

for(let i = 0; i < Object.keys(bags).length; i++){
    for(const key of Object.keys(bags)){
        if(bags_that_are_valid.has(key))continue;
        for(const valid_bag of bags_that_are_valid){
            if(bags[key].hasOwnProperty(valid_bag)){
                    bags_that_are_valid.add(key);
            }
        }
    }
}





// DEPTH = 2, NOT JUST DIRECTLY
console.log(bags_that_are_valid.size);
// fs.writeFileSync('./asdf.json', JSON.stringify(bags));
//  1 dotted bronze bag, 5 dull black bags, 3 muted white bags, 4 wavy maroon bags.

/*
    let bags = {
        "posh coral": {
                "blush blue": 1,
                "wtf": 4
        }
    }
*/