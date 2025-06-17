console.log(x); // ref error , when js trys to access something in memory which is not avalabe in memory
let a = 12

let a = 89 // syntax error no duplicate declaration

var b = 34
var b = 78


// open dev tools -> sources and look for call stack and use debugger points
// to really understand the temporal dead zone and hoisting 

// temporal deadzone is basically the time difference between declaration of a varibale 
// using const or let and its initilization, during this time varibale can not be accessed
// it results in ref error, why ref error bcz variable do exist in diff memory but not accessable
// try dev tools you will understand everything


// but var does not have TDZ it exist in same global memory

// const must be declared and initilized at same place
const c; // syntax error, coz missing syntax or missing initilization
c = 45 // type error , type error coz c was a type of const which is constant and we are trying to assign it something else