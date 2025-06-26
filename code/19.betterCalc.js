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
            console.log(tempResult)
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

        this.evaluate();

        console.log(this.operationString);

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
        console.log(onClick)
        button.addEventListener("click", () => onClick(label))
        return button

    }

    createUI() {
        const display = document.createElement("div")
        const keyPad = document.createElement("div")

        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        const ops = ["+", "-", "*", "/"];

        nums.forEach(n => {
            keyPad.appendChild(this.createButton(n, this.handleInput.bind(this)))
        })

        ops.forEach(op => {
            keyPad.appendChild(this.createButton(op, this.handleInput.bind(this)))
        })

        document.body.appendChild(keyPad)
    }

    handleInput(value) {
        this.calc.input(value)
    }
}


const cal = new Calculator()
const gui = new Gui(cal)