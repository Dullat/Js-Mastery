class Calculator {
    constructor() {
        this.operationString = "";
        this.result = 0;
        this.wasLastOperator = false;
        this.operators = new Set(["+", "-", "*", "/"]);
    }

    isOperator(value) {
        return this.operators.has(value)
    }

    tokenize(expression) {
        return expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g) || [];
    }

    evaluate() {
        const tokens = this.tokenize(this.operationString)
        console.log(tokens)
        const lastToken = tokens[tokens.length - 1]
        if (this.operators.has(lastToken)) {
            this.wasLastOperator = true
            return
        } else {
            this.wasLastOperator = false
        }

        try {
            const tempResult = (Function(`"use strict"; return(${tokens.join("")})`))();
            return tempResult
        } catch (error) {
            console.log(error)
        }
    }

    input(value) {
        const isOP = this.isOperator(value)

        if (this.wasLastOperator && isOP) {
            this.operationString = this.operationString.slice(0, -1) + value
        } else {
            this.operationString += value;
        }

        return this.evaluate();

    }

    returnOpString(){
        return this.operationString
    }
}


class Gui {
    constructor(calcInstance) {
        this.calc = calcInstance;
        this.createUI()
    }

    createButton(label, onClick) {
        const button = document.createElement("button")
        button.textContent = label
        button.classList.add("btn")
        console.log(onClick)
        button.addEventListener("click", () => onClick(label))

        return button

    }

    display(opString, tempResult){
        const calcDisplay = document.querySelector('.display')
        calcDisplay.querySelector('.op-str-el').textContent = opString
        calcDisplay.querySelector('.temp-res-el').textContent = tempResult
    }

    createUI() {
        const display = document.createElement("div")
        const operationStringElement = document.createElement("div")
        const tempResElement = document.createElement("div")
        const keyPad = document.createElement("div")
        display.classList.add('display')
        keyPad.classList.add('keypad')
        operationStringElement.classList.add("op-str-el")
        tempResElement.classList.add("temp-res-el")

        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        const ops = ["+", "-", "*", "/"];

        nums.forEach(n => {
            keyPad.appendChild(this.createButton(n, this.handleInput.bind(this)))
        })

        ops.forEach(op => {
            keyPad.appendChild(this.createButton(op, this.handleInput.bind(this)))
        })

        document.body.appendChild(display)
        document.body.appendChild(keyPad)
        display.appendChild(operationStringElement)
        display.appendChild(tempResElement)
    }

    handleInput(value) {
        let tempRes = this.calc.input(value)
        let opString = this.calc.returnOpString()
        this.display(opString, tempRes)
    }
}


const cal = new Calculator()
const gui = new Gui(cal)
