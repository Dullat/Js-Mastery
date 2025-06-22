const dude = {}
dude.name = "dullat"
console.log(dude)

console.log(dude.valueOf())

// No matter what meathod you use to create an object , it gets a prperty __proto__
// that has all the stuff from which your object is going to inherit and in js evary
// object is inheritancee of "Object." class or object itself

// const dude = {
//  __proto__: {...}
// }

// Object: {
//  things to be inherited like
//  valueOf: fun()
// }

// cool things####################

// const name = "dullat"

// console.log(name.__proto__);  // do this in browser you will get all the meathods in string like chatat,endsWith even proto__
