if (true) {
    console.log("trueeee")
}


// else if and Nesting

const age = 34

if (age < 18) {
    console.log("minor")
} else if (age >= 18) {
    age >= 21 ? console.log("adult and can drink") : console.log("adult but cant drink")
}

// ## fizz buzz

let counter = 1

do {
    if (counter % 3 === 0 && counter % 5 === 0) {
        console.log("fizzbuzz")
    } else if (counter % 5 === 0) {
        console.log("Buzz")
    } else if (counter % 3 === 0) {
        console.log("Fizz");
    } else console.log(counter);
    

        counter++
} while (counter <= 30)


// better approach 

let counter2 = 1

do{
    let output = '';

    (counter2 % 3 === 0) && (output += "fizz"); // if you wann use this then use ";" inside whole block

    (counter2 % 5 === 0) && (output += "buzz"); // in this type of things , if no semicolon exists before a line starting with (, JavaScript might misinterpret it as a function call or grouped expression attached to the previous line.

    console.log(counter2 + ' ' + output);
    

    counter2++
}while(counter2 <= 30)


// Loops and 