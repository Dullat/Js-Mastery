let str1 = 'I\'ve got someting'

let str2 = "bro her name is 'jane', and i ....."

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
