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

let fruit;

function ask() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => {
        rl.question("enter a fruit name", fruit => {
            rl.close()
            resolve(fruit)
        })
    })
}

async function createObj(params) {
    fruit = await ask()
    return {
        [fruit]: 5, // just focus here for now 
    }
}

let fruitObj = createObj()

if(fruitObj )

