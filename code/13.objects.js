// singleton, later


// object literals
const readline = require("readline")

const obj1 = {
    id: 1,
    name: "ram",
    work: "webdev",
    age: 24,
    "like birds": true // multiword properties
}

delete obj1["like birds"]

console.log(obj1["like birds"], obj1.name, obj1)

// computed properties

let fruit = "apple";
const mySym = Symbol("key1") // symbol is a datatype to use this in obj we use "[]"

const fvFruitObj = {
    [fruit]: 5,
    [mySym]: "mykey1"
}

console.log(typeof(mySym))
console.log(fvFruitObj)


// to stop values changing Object.freeze("theobject")

Object.freeze(fvFruitObj)

fvFruitObj.apple = 7
console.log(fvFruitObj.apple)

// in operator

console.log("apple" in fvFruitObj)

// realworld example

