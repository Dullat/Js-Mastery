import { cart } from "../../data/cart.js";
import { products, getProducts } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";


export function paymentSummary() {
    let totalItems = 0;
    let totalPrice = 0;
    let shipptingPrice = 0;
    let totalPriceBeforeTax = 0;
    let taxPercentage = .10;
    let taxAmmount = 0;
    let totalPriceAfterTax = 0;

    

    cart.forEach(cartItem => {
        const matchingProduct = getProducts(cartItem.productId)
        
        totalPrice += matchingProduct.priceCents * cartItem.quantity
        totalItems += cartItem.quantity

        deliveryOptions.forEach(option => {
            if(cartItem.deliveryOptionId === option.id){
                shipptingPrice += option.priceCents
            }
        })
    });

    totalPriceBeforeTax = totalPrice + shipptingPrice
    taxAmmount = totalPriceBeforeTax * taxPercentage
    totalPriceAfterTax = totalPriceBeforeTax + taxAmmount

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalItems}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shipptingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxAmmount)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$ ${formatCurrency(totalPriceAfterTax)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML
}