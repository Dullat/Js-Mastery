// Asynchronous js and callbacks

// ### first synchronous js ###

// js code is executed line by line

{
    let pizza;

    function orderPizza() {
        console.log('order pizza')
        pizza = '🍕'
        console.log('pizza was ordered')
    }

    orderPizza()
    console.log(`Eat ${pizza}`);
}

// pizza take some time to make

{
    let pizza;

    function orderPizza() {
        console.log('order pizza')
        setTimeout(() => {  // js does not wait for setTimeout because its asynchronous
            pizza = '🍕'    // so it moves to console.log() 
        }, 2000)
        console.log('pizza was ordered')
    }

    orderPizza()
    console.log(`Eat ${pizza}`);
}

// ### Async example ###

{ // here pizza gets ready in 2 sec(setTimeout) , meanwhile all the other code finished execution
    let pizza;

    function orderPizza() {
        console.log('order pizza')
        setTimeout(() => {   // // this code runs later, in a different execution context (callback queue/event loop)
            pizza = '🍕'
            console.log(`${pizza} is ready`)
        }, 2000)
        console.log('pizza was ordered')
    }

    orderPizza()
    console.log("call friend");
    console.log(`Eat ${pizza}`);
}

// correct way with callbacks

{
    function orderPizza(callback) {
        setTimeout(() => {
            const pizza = "🍕"
            callback(pizza)
        }, 2000)
    }

    function pizzaReady(pizza) {  // this will be a call back fun, will be passed to orderPizza()
        console.log(`Eat the ${pizza}`);
    }

    orderPizza(pizzaReady)
    console.log("Pizza ordered...")
    console.log("chatting with a friend")
}

// This is also an example of async code
// The browser listens for a click in the background(event loop)
// When a click happens, the callback runs asynchronously

// window.addEventListener('click', function () {
//     console.log("clicked")
// })

// ### real example ###
// in html file