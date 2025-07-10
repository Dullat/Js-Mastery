import { renderOrderSummary } from "./checkout/orderSummary.js";
import { paymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import '../data/cart.class.js'
// import '../data/backend-practice.js'


new Promise((resolve) => { // this thing's md is in theory
    loadProducts(() => {
        renderOrderSummary()
        paymentSummary()
        resolve();
    })
}).then(()=> {
    console.log("finished loading and rendring")
})

// loadProducts(() => {
//     renderOrderSummary()
//     paymentSummary()
// })