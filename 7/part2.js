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


// RECURSION
// HOW MANY BAGS ARE IN A SINGLE SHINY BAG?
// ALL OF THEM, FOR THE SAKE OF RECURSION
let final_result = 0;
function findHowManyBags(bags_obj, name_of_bag, no_of_bags, count){
    final_result += no_of_bags * count;
    if(bags_obj[name_of_bag].hasOwnProperty("other") &&
        bags_obj[name_of_bag]["other"] == 0) return;
    for(const key of Object.keys(bags_obj[name_of_bag])){
        let curr_bags = bags_obj[name_of_bag][key];
        //console.log(curr_count);
        // console.log(key, curr_bags, no_of_bags * copy_of_count, final_result);
        findHowManyBags(bags_obj, key, curr_bags, no_of_bags * count);
    }
}
findHowManyBags(bags, 'shiny gold', 1, count, result);
console.log(final_result - 1);
//console.log(result - 1);


/*

1 shiny gold
5 blushy blues                                        , 10 redy reds
10 blacky blacks, 4 brownie breds                     , 2 wownie gets, 7 poochie pegs
0, 0                                                        0, 0

10 * 5 + 4 * 5 + 10 * 2 + 7 * 10;

*/