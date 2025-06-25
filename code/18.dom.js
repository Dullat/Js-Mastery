document.body.innerHTML = `<h1>Calculator</h1>`
document.title = "Calculator"

document.querySelector("h1").style.cssText = `color: red; background-color: gray;`
const h1Element = document.querySelector("h1")

h1Element.style.backgroundColor = "blue"


// calculator ui with js

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const ops = ["+", "-", "*", "/"]
let operationString = ""
let wasLastOP = false;
let result = 0

const keyPad = document.createElement("div")

function tokenize(expression) {
    return expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
}


function performeOP() {
    let tokenized = tokenize(operationString)
    const lastToken = tokenized[tokenized.length - 1]
    if (!ops.includes(lastToken)) {
        wasLastOP = false
        result = Function(`"use strict"; return (${tokenized.join('')})`)();
        console.log("Result:", result);
    }else {
        wasLastOP = true
    }
}

function addNumsToString(value) {
    let currentOP = ops.includes(value);
    if (currentOP && wasLastOP){
        operationString = operationString.slice(0,-1) + value
    }else{
        operationString += value
    }
    console.log(operationString)
    performeOP();
}

function createNumKeys(args) {
    const btn = document.createElement('button')
    btn.textContent = args.el
    btn.addEventListener("click", () => addNumsToString(args.el))
    keyPad.appendChild(btn)
}

function createOpKeys(args) {
    const btn = document.createElement('button')
    btn.textContent = args.el
    btn.addEventListener("click", () => addNumsToString(args.el))
    keyPad.appendChild(btn)
}

nums.map((el, i) => {
    createNumKeys({ el, i })
})

ops.map((el, i) => {
    createOpKeys({ el, i })
})


function genResult(){
    operationString = result
}

const printResultBtn = document.createElement("button")
printResultBtn.textContent = "="
printResultBtn.addEventListener("click", () => genResult())
keyPad.appendChild(printResultBtn)



document.body.appendChild(keyPad)







/*

const opsSet = new Set(["+", "-", "*", "/"]);

if (opsSet.has(value)) {
    // value is an operator
}

*/