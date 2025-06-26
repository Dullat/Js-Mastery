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

    tokenize(expression){
        return expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g) || [];
    }

    evalulate(){
        const tokens = this.tokenize(this.operationString)
    }

    input(value) {
        const isOP = this.isOperator(value)

        if (this.wasLastOperator && isOP) {
            this.operationString = this.operationString.slice(0, -1) + value
        } else {
            this.operationString += value;
        }

        // this.evaluate();
        console.log(this.operationString)
    }
}

const cal = new Calculator()
cal.input("2")
cal.input("+")
cal.input("-")
cal.input("2")
