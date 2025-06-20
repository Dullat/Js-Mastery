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
console.log(newObj2)


// keys and values

console.log(Object.keys(newObj2), Object.values(newObj2), Object.entries(newObj2))
console.log(newObj2.hasOwnProperty("name"));
