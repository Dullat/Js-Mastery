var name = "dullat"
let $name2 = "jatt"
const _val = 45

// ############  ----- Hoisting ----- ###############

// ### Var Hoisting ###
console.log(hvar0) // it will logged as undefined , but will be logged coz var is hoisted

var hvar0 = 23

// ### Let hoisting ###

// console.log(hlet0);  cant access , Declarations are hoisted but not initialized, leading to a Temporal Dead Zone (TDZ).


let hlet0 = 34

// ############  -------------------- ###############








// ############ -------- scop -------- ##############

// ### Var and Let###

{
    var var0 = 34 // it will be logged coz var is fun scoped, it does not consider block
}

function varFun(){
    var var1 = 34 // but this wont be logged outside of fun , coz its fun scoped

    {
        var var2 = 45
        let let2 = 67
    }

    console.log(var2) // will be logged coz it is fun scoped
    // console.log(let2)  # cant access because its block scoped
}

varFun();

var var2 = 90
var var2 = 78
var2 = 456

console.log(var0, var2 )



// ### CONST ==> similar to let but value cant be changed