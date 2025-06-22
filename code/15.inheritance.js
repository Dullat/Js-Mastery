import chalk from "chalk"
console.log(chalk.bgGray("################ The Problem ###################"))
const me = {
    talk() { return "'talking'" }
}

const you = {
    talk() { return "'talking'" }
}

console.log(chalk.blue.bold(me.talk(), you.talk()))

console.log(chalk.green("this is the problem here , for each object we are creating same function agan and again, in real world we cant use this , so we use inheritance #prototypal inheritace"))

// ################ inheritance ###################
console.log(chalk.bgGray("################ inheritance / Classes ###################"))

class Person {
    talk() {
        return "talking"
    }
}

const me1 = new Person()


console.log(chalk.blue(me1.talk()))
console.log(chalk.green.bold(Person.prototype === me1.__proto__))
console.log(chalk.green("lets say that talk has some problem and we want to fix it, so we only have to fix class or .prototype"))

Person.prototype.talk = function () { return "new and improved talk" }
const you2 = new Person()
console.log(chalk.green.bold(you2.talk));

console.log(chalk.bgGray("################ Now, Real shit, classes are just syntatic sugar, they use objects and prototypes under the hood ###################"))

{    // this is what js does when we create class
    function Preson(){}
    Person.prototype.talk = function(){
        return 'talking'
    }

    const me = new Person()
    console.log(chalk.red(me.talk, me.__proto__, me))
}

console.log(chalk.bgGray("################ constructors ###################"))

{
    function Person(){
        this.talk = function(){return "constructor talking"}
    }

    const p1 = new Person() // if you run this in a browser talk will ve directly on person, diff copies will be created
}

// on 11:00 = https://youtu.be/jnME98ckDbQ?si=7ezVYXe-3c3_ByUL

// extending #########################
console.log(chalk.bgGray("################ Extending ###################"))

{
    class Person{
        talk(){
            return "talking"
        }
    }

    class SuperHuman extends Person{
        fly(){
            return "flyinggggg"
        }
    }

    let s1 = new SuperHuman()

    console.log(s1.__proto__);
    console.log(s1.fly());
    
}

console.log(chalk.bgGray("################ few ways to inherit ###################"))
// 1
{
    const person = {    // object literal
        talk() {
            return "talking"
        }
    }

    const me = Object.create(person)

    console.log(chalk.green.bold(me.talk()));
    
}

//2

{
    const person = {    // object literal
        talk() {
            return "talking"
        }
    }

    const me = {}

    Object.setPrototypeOf(me, person)

    console.log(chalk.green.bold(me.talk()));
    
}

// 3
// above in classes "extends"
