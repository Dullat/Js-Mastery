const users = [
    {
        id: 1,
        name: "Alice",
        age: 25,
        role: "developer",
        isActive: true,
        skills: ["JavaScript", "React"]
    },
    {
        id: 2,
        name: "Bob",
        age: 32,
        role: "designer",
        isActive: false,
        skills: ["Photoshop", "Figma"]
    },
    {
        id: 3,
        name: "Charlie",
        age: 28,
        role: "developer",
        isActive: true,
        skills: ["Node.js", "TypeScript", "MongoDB"]
    },
    {
        id: 4,
        name: "Diana",
        age: 22,
        role: "intern",
        isActive: true,
        skills: ["HTML", "CSS"]
    },
    {
        id: 5,
        name: "Eve",
        age: 35,
        role: "manager",
        isActive: false,
        skills: ["Leadership", "Scrum"]
    }
];

// you also did include here
console.log(users.filter(el => el.skills.map(skill => skill.toLowerCase()).includes("react")))  // returns whole obj(el) if consition is true
console.log("############################################################");

console.log(users.map(el => el.name))  // returns only given el from obj
console.log("############################################################");

console.log(users.find(user => user.name === "Eve"))  // returns first match it find
console.log("############################################################");

users.forEach((user, index) => {   // does not return anything , just better that for loop
    console.log(index)
    console.log(user.name, user.id);
    if (user.id === 4) console.log("its 4th element");
})
console.log("############################################################");

console.log(users.some(user => user.role === "manager")); // returns true or false
console.log("############################################################");

console.log(users.every(user => user.role === "manager")); // returns true or false
console.log("############################################################");

const sortedByAge = [...users].sort((a, b) => b.age - a.age) // returns true or false
console.log(sortedByAge)
console.log("############################################################");

console.log(
    users.reduce((currentUserAge, user) => { // getting total prices
        return user.age + currentUserAge
    }, 0)
);
console.log("############################################################");


console.log(users.flatMap(user => user.skills))
console.log("############################################################");

// for ....of loop for arrays

const fruits = ["apple", "mango", "banana"]

for(let fruit of fruits) console.log(fruit);
console.log("############################################################");


console.log(typeof(users.map(el => el.name).join("*")))   // join , convets array into string