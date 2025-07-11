function orderPizza(callback) {
    setTimeout(() => {
        console.log("🍕 Ordered")
        callback()
    }, 2000)
}

function bakePizza(callback) {
    setTimeout(() => {
        console.log("🍕 Baked")
        callback()
    }, 2000)
}

function deliverePizza(callback) {
    setTimeout(() => {
        console.log("🍕 Delivered")
        callback()
    }, 2000)
}

function eatPizza() {
    setTimeout(() => {
        console.log("Eating 🍕, yummm.. 😃")
    }, 2000)
}

// callback hell, nesting
orderPizza(() => {              // first step: order
    bakePizza(() => {           // then: bake
        deliverePizza(() => {   // then: deliver
            eatPizza();         // finally: eat
        });
    });
});