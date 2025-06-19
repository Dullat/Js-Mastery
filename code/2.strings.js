let str1 = 'I\'ve got someting' // \ and \n are escape chars

let str2 = "bro her name is 'jane', and i ....."

let strNew = new String("6 + 9")
console.log("new str",strNew);


console.log(str1 + ' ' + str2) // concat

console.log(str1 + 3) // if we add a str and n ,js will convert into str

console.log(typeof(str1))

// calculating price

let price1 = '$' + 20.70 + 7.99 // not gonna add , i will convet it into a string = '$20.70.7.99'
console.log(price1)

// solution

let price2 = '$' + (20.70 + 7.99).toFixed(2) // '$28.68' or You can do it in cents like = "(2070 + 799) / 100"
console.log(price2)

// another examples

let str4 = 'items (' + (1+1) + ') : $' + (20.70 + 7.99).toFixed(2)

console.log(str4)

// template strings , interpolation is cleaner

let age = 23;

let mssg = `your age is ${23},
and you are learning js`

console.log(mssg);

// a magic, read md file of "variables"

let m1 = "5" + 2 // "52"
let m2 = "5" - 2 // 3

console.log(m1, "\n", m2)

// ################## strings Meathods ##############

let userName = "dullatJatt"
let notTrim = "dullat    "
console.log(notTrim.trim())

console.log(userName.length)

console.log(userName.charAt(0))
console.log(userName.at(-1), "last value") // can accept negative value

console.log(userName.indexOf("t"))
console.log(userName.lastIndexOf("t"))

console.log(userName.repeat(5))

console.log(userName.startsWith("d"))
console.log(userName.endsWith(" "))

console.log(userName.replace("t", "T"))
console.log(userName.replaceAll("t", "T"))

console.log(userName.slice(2, -3))

console.log(userName.concat(" ", notTrim));
// ## slicing
console.log("################# slicing ###############################");


const fullName = "dullat jatt"

let firstName = fullName.slice(0, 6)
let lastName = fullName.slice(7)
let lastChar = fullName.slice(-1)
console.log(firstName, lastName, "\n", lastChar);

firstName = fullName.slice(0, fullName.indexOf(" "))
lastName = fullName.slice(fullName.indexOf(" ")+1)
lastChar = fullName.slice(-1)
console.log(firstName, lastName, "\n", lastChar);



// ### experiments
console.log("################# slicing ###############################");

userName.charAt(0) > userName.charAt(1) ? console.log(userName.charAt(0)) : console.log(userName.charAt(1));

console.log(eval("6+7"));
console.log("a+b".valueOf());



// meathod chaning : https://youtu.be/J4YhlDsNqeE?si=BGI1tSJZ2NqnRuoz

let userName2 = "  dUlLatJaTT"

console.log(userName2.trim().charAt(0).toUpperCase() + userName2.trim().slice(1).toLowerCase())