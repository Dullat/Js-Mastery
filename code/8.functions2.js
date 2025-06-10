// greetFun() this wont work , sure vars are hoisted but not fun bodies so it will say fun not defined

var greetFun = function greet() {
    console.log("im greeting");
}

console.log(greetFun.toString());

//############# Real Shit #############


// function statement aka fun declaration

function a() {
    consolel.log("that's it, this is a fun statement")
    // will be hoisted
}

// function expresstion

var b = function (value) {
    console.log("assigning fun to a variable") // The main diff between statement and expression is that statement fun is hoisted but in expression its not 
    // but if var then the var will be hoisted not the fun body and let and const are not hoisted at all
}



// function declaration

function vb() {
    // its nothig just same , decleration and statement are same
    // it is used only the places where funs are used as values
}



// Anonymous Function

function () {
    // they dont have identity, also this will give error and invalid syntax
}

let anony = function () { }




// Named function Expression

var namedFun = function xyz() {
    xyz()
} // if you try xyz() this will give error , coz you created it as value or local scop to varibale
// but you can call it inside itself , very usefull in recursion



// Diff in Perameters and Args

function diffs(para1, pera2) { }

diffs(arg1, arg1)




// First class functions or First class citizen

// basically passing funs as args, returning funs, or treating them as values

function castMsg(fn) {
    fn()
    return function () {
        return "im returning"
    }
}

const greet = function () {
    console.log("im greeting");
}

let gotSomethingHere = castMsg(greet)
gotSomethingHere = castMsg(function () { console.log("im first class too") })


// Arrow functions

// will cover independently , deeply
