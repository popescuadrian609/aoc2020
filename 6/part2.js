const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {encoding: "utf-8", flag:"r"});

file_contents = file_contents.split(/(\r?\n|\n){2,}/gm);

let counter = 0;

function findCommonEntries(set1, set2){
    let final_set = new Set();
    const it = set1.values();

    let value;
    while(value = it.next().value){
        if(set2.has(value))final_set.add(value);
    }
    return final_set;
}


for(let i = 0; i < file_contents.length; i++){
    let group = file_contents[i];

    let people = group.split(/\r?\n/gm);
    // For every group:
    // Get elements of the first person
    // Compare them with the second person from that group
    // Have a FINAL set that will firstly have all the common entries of the 1st and 2nd person
    // Repeat algorithm but instead of the first person it will always be the FINAL set you compare each other person to

    let final_set = undefined;
    let temp_set;
    let no_common = false;
    
    for(let j = 0; j < people.length; j++){
        temp_set = new Set();
        let answers = people[j];
        for(let k = 0; k < answers.length; k++){
            temp_set.add(answers[k]);
        }
        if(!final_set){
            final_set = temp_set;
            continue;
        }
        final_set = findCommonEntries(final_set, temp_set);
        if(final_set.size == 0){
            no_common = true;
            break;
        }
    }

    if(no_common)continue;
    no_common = false;
    counter += final_set.size;
    final_set = undefined;
}

console.log(counter);