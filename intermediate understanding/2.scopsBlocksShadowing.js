{
    // block , also known as compound statement
    // can be used, where js expects a single statment like "if"
}

if (true) { // if expects a single statement so we use compound or block to wrap multiple into one compound statement
    let a = 10
    console.log(a)
}


// block scope

{
    var a = 13
    let letA = 34;
    const constA = 89 // let and const are block scoped see in "sources in dev-tools"
    console.log(a, letA, constA)
}

console.log(a, "logged var")

try {
    console.log(letA)
    console.log(constA);
} catch (error) {
    console.error("const and let remaind inside block they cant be accessed outside of block", error, "check block memory in dev tools")
}



// shadowing
var a = 12

if (true) {
    var a = 34
    console.log(a); // 34
}

console.log(a, "shadowed");  // 34


let x = 89;
var y = 78;
{
    // var x = 56; // will give error coz for shadowing var should not go outside this block but it goes coz its fun scoped
    let y = 6; // this is possible coz let does not goes outside of block
}

let m = 3
function someFun(params) {
    var m = 34 // this works coz var is inside fun
    console.log(m);

}

console.log(m);


someFun()

// lexical thingi

let l = 1
{
    let l = 2
    {
        let l = 3      // each block has its own lexical scop
        console.log(l) // if "l" is not present in here it look in lexical environment and form a lexical scop chain chain
        // put a pause in here and see memory is created for each block, and has own "l"
    }
}


// these rules for arrow fun are same
