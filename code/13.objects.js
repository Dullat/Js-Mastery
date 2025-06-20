const readline = require("readline")

// ########### Singleton (later) ###########

const tinderUser = new Object()
console.log(tinderUser)


// ########### Object Literals ###########
console.log("################# Object Literals ##########")

const obj1 = {
    id: 1,
    name: "ram",
    work: "webdev",
    age: 24,
    "like birds": true // multiword property
}

delete obj1["like birds"]

console.log(obj1["like birds"], obj1.name, obj1)


// ########### Computed Properties ###########
console.log("################# Computed Properties ##########")

let fruit = "apple"
const mySym = Symbol("key1") // Symbol used as a property key

const fvFruitObj = {
    [fruit]: 5,
    [mySym]: "mykey1"
}

console.log(typeof (mySym))
console.log(fvFruitObj)


// ########### Object.freeze ###########
console.log("################# Object.freeze ##########")

Object.freeze(fvFruitObj)
fvFruitObj.apple = 7 // will not change due to freeze
console.log(fvFruitObj.apple)


// ########### 'in' Operator ###########
console.log("################# 'in' Operator ##########")

console.log("apple" in fvFruitObj)


// ########### Factory fun ###########
console.log("################# Factory fun ##########")

function makeUser(name, age) {
    return {
        name: name,
        age: age,
        print() {
            console.log(this)
        }
    }
}

let user1 = makeUser("dullat", 12)

user1.print()

user1.greeting = function () {
    console.log(this)
}
user1.greeting()


// ########### Check if Object is Empty ###########
console.log("################# Check if Object is Empty ##########")

const emptyObj = {}

function isEmpty(obj) {
    for (let key in obj) {
        return "not empty"
    }
    return "its empty"
}

console.log(isEmpty(emptyObj))


// ########### Sum Numeric Properties ###########
console.log("################# Sum Numeric Properties ##########")

const numObj = {
    age: 34,
    height: 345,
    weight: 65
}

for (let key in numObj) {
    console.log(key)
}

function sumProps(obj) {
    let total = 0
    for (let key in obj) {
        if (typeof obj[key] === 'number') {
            total += obj[key]
        }
    }
    return total
}

console.log(sumProps(numObj)) // Output: 444

numObj["age"] = { 2014: 22, 2015: 23 }

console.log(numObj["age"]["2014"])


// ########### cons ###########
console.log("################# Constructors ##########")

function Person(name) {
    this.name = name;
    this.introduceSelf = function () {
        console.log(`Hi! I'm ${this.name}.`);
    };
}

const p1 = new Person("dullat")
p1.introduceSelf()

// ########### Map ###########
console.log("################# Map ##########")

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users = [john, pete, mary];

let names = users.map(item => item.name)

console.log(names)

// You have an array of user objects, each one has name, surname and id.
// Write the code to create another array from it, of objects with id and fullName, where fullName is generated from name and surname.

let john1 = { name: "John", surname: "Smith", id: 1 };
let pete2 = { name: "Pete", surname: "Hunt", id: 2 };
let mary3 = { name: "Mary", surname: "Key", id: 3 };

let users1 = [john1, pete2, mary3];

let newUser = users1.map(item => {
    return {
        id: item.id,
        fullName: `${item.name} ${item.surname}`  // item.name.concat(" ",item.surname)
    }
})

console.log(newUser)


// sort by age and sum of age

{
    let john = { name: "John", age: 25 };
    let pete = { name: "Pete", age: 30 };
    let mary = { name: "Mary", age: 28 };

    let arr = [pete, john, mary];

    function sortByAge(arr) {
        return arr.sort((a, b) => a.age - b.age)
    }

    function avgAge(arr) {
        return Math.floor(arr.reduce((sum, person) => (sum + person.age), 0) / arr.length)
    }


    console.log(sortByAge(arr), avgAge(arr));

}

{
    let users = [
        { id: 'john', name: "John Smith", age: 20 },
        { id: 'ann', name: "Ann Smith", age: 24 },
        { id: 'pete', name: "Pete Peterson", age: 31 },
    ];

    function groupById(users) {
        const keyed = users.reduce((obj, value) => {
            obj[value.id] = value
            return obj
        }, {})

        return keyed
    }

    console.log(groupById(users))
}

function Calculator() {
    this.meathods = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b
    }

    this.calculate = function (str) {
        let splited = str.split(" "),
            a = number(splited[0]),
            b = number(splited[2]),
            op = number(splited[1]);

        return this.meathods[op](a, b)
    }

    this.addMeathod = function (name, fun) {
        this.meathods[name] = fun
    }
}

