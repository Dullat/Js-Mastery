// operator 

let a = .1
let b = .2

let result = a + b

console.log(Math.round(result * 100) / 100)

// or 

console.log(Math.floor(result * 10) / 10)


// string meathod

let strRes = result.toFixed(2) // this will return string

console.log(Number(strRes))

// calculate money in dollars 20.95 + 7.99 , 1 $ = 100 cents so we can do

let tshirt = 2095
let cap = 799

console.log((tshirt+cap) / 100) // 28.94

// min max

console.log(Math.max(45, 67))