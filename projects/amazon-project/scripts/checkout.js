import { renderOrderSummary } from "./checkout/orderSummary.js";
import { paymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
// import '../data/cart.class.js'
// import '../data/backend-practice.js'


async function loadPage() {
    await loadProductsFetch() // we dont have to use .then we can use await and write code line by line
    renderOrderSummary()
    paymentSummary()
}

loadPage()


// loadProductsFetch().then(() => {
//     renderOrderSummary()
//     paymentSummary()
// })

// new Promise((resolve) => { // this thing's md is in theory
//     loadProducts(() => {
//         renderOrderSummary()
//         paymentSummary()
//         resolve();
//     })
// }).then(()=> {
//     console.log("finished loading and rendring")
// })

// loadProducts(() => {
//     renderOrderSummary()
//     paymentSummary()
// })