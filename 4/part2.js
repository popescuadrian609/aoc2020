const fs = require('fs');

let file_contents = fs.readFileSync(__dirname + '/input.txt', {encoding: "utf-8", flag:"r"});

file_contents = file_contents.split(/(\r?\n|\n){2,}/gm);

let counter = 0;

function checkIfPassportValid(passport_string){
    let passport = {};
    let eye_colors = new Set(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]);
    ////console.log(passport_string);
    passport_string = passport_string.replace(/\r\n/gm, ' ');
    let passport_split_up = passport_string.split(' ');
    
    for(let i = 0; i < passport_split_up.length; i++){
        let field = passport_split_up[i].split(':')[0].trim();
        let value = passport_split_up[i].split(':')[1].trim();
        passport[field] = value;
    }
    ////console.log(passport);

    let properties = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    for(let i = 0; i < properties.length; i++){
        if(!passport.hasOwnProperty(properties[i]))return false;
    }

    if(parseInt(passport['byr']) < 1920 || parseInt(passport['byr']) > 2002){
        //console.log(`Passport birth year is not valid ${passport["byr"]}`);
        return false;
    }
    
    if(parseInt(passport['iyr']) < 2010 || parseInt(passport['iyr']) > 2020){
        //console.log(`Passport issue year is not valid ${passport["iyr"]}`);
        return false;
    }
    
    if(parseInt(passport['eyr']) < 2020 || parseInt(passport['eyr']) > 2030){
        //console.log(`Passport expiration year is not valid ${passport["eyr"]}`);
        return false;
    }
    let last_2_chars_of_height = passport['hgt'].substring(passport['hgt'].length-2);
    if(last_2_chars_of_height !== 'cm' && last_2_chars_of_height !== 'in'){
        //console.log(`The last 2 chars of height are: |${last_2_chars_of_height}|`);
        return false;
    }
    if(last_2_chars_of_height == 'cm'){
       if(parseInt(passport['hgt'].substring(0, passport['hgt'].length - 2)) < 150 || parseInt(passport['hgt'].substring(0, passport['hgt'].length - 2)) > 193){
        //console.log(`Height invalid ${parseInt(passport['hgt'].substring(0, passport['hgt'].length - 2))}cm`);
        return false; 
       }
    }
    if(parseInt(passport['hgt'].substring(0, passport['hgt'].length - 2)) == 'in'){
        if(parseInt(passport['hgt'].substring(0, passport['hgt'].length - 2)) < 59 || parseInt(passport['hgt'].substring(0, passport['hgt'].length - 2)) > 76){
        //console.log(`Height invalid ${parseInt(passport['hgt'].substring(0, passport['hgt'].length - 2))}in`);
        return false;
        }
    }


    if(passport['hcl'].substring(0, 1) != '#') return false;
    for(let i = 1; i < passport['hcl'].length - 1; i++){
        let char = passport['hcl'].charCodeAt(i);
        if(!((char > 47 && char < 58) || (char > 96 && char < 103)))
        {
            //console.log(`${passport['hcl']} is invalid`)
            return false;
        }
    }

    
    if(!eye_colors.has(passport["ecl"])){
        //console.log(`Eye color is not valid ${passport["ecl"]}`);   
        return false;
    }

    if(passport["pid"].length != 9){
        //console.log(`Passport pid is not 9 chars long ${passport["pid"]}`);
        return false;
    }
    if(isNaN(parseInt(passport["pid"])))
    {
        //console.log(`Passport pid is NaN ${passport["pid"]}`);
        return false;

    }
    
    //console.log(passport);

    return true;
}


for(let i = 0, line; i < file_contents.length; i++){
    line = file_contents[i];
    
    
    let valid = true;
    let attributes = (line.match(/:/g) || []).length;
    let has_cid = line.includes('cid');
    if(attributes != 8){
        if(attributes == 7 && has_cid)valid = false;
        if(attributes < 7)valid = false;
    }


    if(valid){
        checkIfPassportValid(line) ? counter++ : undefined;
    }
}

console.log(counter);