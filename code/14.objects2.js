const tinderUser = new Object()
console.log(tinderUser)

tinderUser.id = "123abc"
tinderUser.name = "dullat"
tinderUser.isLoggedIn = true


const regulatUser = {
    name: "idk",
    email: "haha@mail.com",
    fullname: {
        userfullname: {
            firstname: "dullat",
            lastname: "jatt"
        }
    }
}

console.log(regulatUser.fullname?.userfullname.firstname); // optional chaning

const newObj = Object.assign({}, tinderUser, regulatUser) // .assign(target, source objects)

// or

const newObj2 = {...regulatUser, ...tinderUser}
console.log(newObj2, " newObj2 #############")
console.log(Object.entries(newObj2), " entries  this also works on arrays##########");



// keys and values

console.log(Object.keys(newObj2), Object.values(newObj2), Object.entries(newObj2))
console.log(newObj2.hasOwnProperty("name"));


// prototyping

console.log("###############################################");


function User(name, age){
  this.name = name
  this.age = age    
}

const u1 = new User("dullat", 23)

const sayHi = function(){console.log(`hi this is ${this.name}`)}

User.prototype.sayHi = sayHi
User.prototype.laugh = function(){return this.name}

console.log(Object.getPrototypeOf(u1));


console.log(u1.laugh());