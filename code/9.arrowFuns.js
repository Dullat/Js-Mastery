const sayHello = name => {
    console.log(name)
}

sayHello("dullat")

// OR 

const sayHello2 = name => console.log(name)

sayHello2("youtube.com")

// ###### ...args vs arguments ########
console.log("\n################ The Starting of ...args ####################");

// arrow funs dont have their own arguments object

const arrowFun = () => {
    // console.log(arguments) // it will log lexical args object , its in global scop so it will do some weird shit, but will work no error
}      // and on browser this will give error

arrowFun({ msg: "hi bro am arg" })

// so to do the thing we use Rest Parameters

const arrFun3 = (...args) => {
    args.map(el => console.log(el)) // btw here we have a callback fun
    console.log(args[0])
}

arrFun3("hi", { name: "dullat", age: "idk" }, 23, 67, 90)



// arrow funs dont have their own arguments object, but regular funs do.

function showDifference() {
    const arrowFn = () => {
        try {
            console.log("Arrow arguments:'it used lexical args'", arguments); /// its logging a,b,c why ? coz it has lexcal scop access, it did used passed 1,2,3 it used lexical's args aka para object which was passed to "showDiff" fun and this is a js gotcha
        } catch (e) {
            console.log("Arrow function cannot access arguments");
        }
    }

    function regularFn() {
        console.log("Regular function arguments:", arguments);
    }

    arrowFn(1, 2, 3);
    regularFn(1, 2, 3);
}

showDifference("a", "b", "c");

console.log("\n################ The End of ...args ####################");


// ##############################################

// ######## call backs with arrow #####

console.log("############ callbacks: check line 26, or here is same example ###########")

{ // same as top one but i made it inside block so , no problem, const funs are block scoped
    const arrFun3 = (...args) => {
        args.map(el => console.log(el)) // btw here we have a callback fun
        console.log(args[0])
    }

    arrFun3("hi", { name: "dullat", age: "idk" }, 23, 67, 90)
}


// ######## arrow funs in objects #####

console.log("############ Arrow funs on objs ###########")

const obj1 = {
    meTalk: function () {
        return "hello"
    }
}

const obj2 = {
    youTalk: () => "hola"  // dont use arrow inside obj , coz of .this
}

console.log(obj1.meTalk(), '\n', obj2.youTalk());


// here is the problem

console.log("################## here is the problem ##############")


{
    const obj1 = {
        name: "dullat",
        meTalk() {
            return this // it returned the object , working as expected
        }
    }

    const obj2 = {
        name: "jatt",
        youTalk: () => this, // gotcha returned "{}", coz arrow does not have its own this
        itself: this         // so its just like this line , if you know how this works you will clearly understand this
    }                           // objects does not create binding with .this thats why

    console.log(obj1.meTalk());
    console.log(obj2.youTalk());
    console.log(obj2.itself);
}
