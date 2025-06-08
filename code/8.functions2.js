// greetFun() this wont work , sure vars are hoisted but not fun bodies so it will say fun not defined

var greetFun = function greet(){
    console.log("im greeting");
}

console.log(greetFun.toString());
