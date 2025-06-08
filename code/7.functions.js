call() // this works coz its hoisted

let name1 = "dullat"

function call() {
    console.log("hi there im a fun");
    return 'hi im here'
}

console.log(call)


// another function

function another(term = call()) { // default arg
    console.log('where are you ?:', term);

}

another()
another('im not here')

// returning 

function returning() {
    return (
        "hi " + name1 + " how is your morning" +
        " do you want coffee?"
    )
}

console.log(returning().toUpperCase())

let funValue = returning

console.log(funValue())


//######################################################################
// callback funstions

function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
}

function showOk() {
    console.log("You agreed.");
}

function showCancel() {
    console.log("You canceled the execution.");
}

// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);//here showOk and showCancle are not called their code is sent here we copied value of both functions to yes and no

//   In JavaScript, a function is a value, so we can deal with it as a value. The code above shows its string representation, which is the source code.

// Surely, a function is a special value, in the sense that we can call it like sayHi().

// But it’s still a value. So we can work with it like with other kinds of values.

// We can copy a function to another variable:

// ANOTher way is

function ask2(question, yes, no) {
    if (confirm(question)) yes();
    else no();
}

ask2(
    "are u sure?",
    function () { alert("u agreed") },
    function () { alert("u cant say no to this") }
)


// ##############################################################

const talk = function(){
    console.log("im talking")
}

console.log(talk.toString())

// IMPORTANT in browser if you type ttalk it will print whole fun coz browser automatically call "Function.prototype.toString()"
// in node you can do "Function.toString()"