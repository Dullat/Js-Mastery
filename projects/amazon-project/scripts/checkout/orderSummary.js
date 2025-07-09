import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProducts } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { paymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  const today = dayjs();
  let cartSummaryHTML = "";

  cart.forEach(cartItem => {
    const productId = cartItem.productId;

    const matchingProduct = getProducts(productId)

    if (!matchingProduct) {
      console.warn(`No matching product found for productId: ${productId}`);
      return;
    }

    const deliveryOption = deliveryOptions.find(option =>
      option.id == cartItem.deliveryOptionId
    );

    if (!deliveryOption) {
      console.warn(`No delivery option found for ID: ${cartItem.deliveryOptionId}`);
      return;
    }

    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>
        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">Update</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
          <div class="delivery-options js-delivery-options">
            ${deliveryOptionsHTML(matchingProduct, cartItem, today)}
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach(link => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      paymentSummary()
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach(element => {
    element.addEventListener("click", () => {
      const { productId, deliveryOption } = element.dataset;
      updateDeliveryOption(productId, deliveryOption);
      renderOrderSummary();
      paymentSummary()
    });
  });
}

function deliveryOptionsHTML(product, cartItem, today) {
  let html = "";

  deliveryOptions.forEach(deliveryOption => {
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const priceString = deliveryOption.priceCents === 0 ? 'Free' : 'Only';
    const isChecked = deliveryOption.id == cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option">
        <input 
          type="radio" 
          class="delivery-option-input js-delivery-option" 
          name="delivery-option-${product.id}" 
          ${isChecked ? "checked" : ""} 
          data-product-id="${product.id}" 
          data-delivery-option="${deliveryOption.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDate.format("dddd, MMMM D")}
          </div>
          <div class="delivery-option-price">
            ${formatCurrency(deliveryOption.priceCents)} ${priceString}
          </div>
        </div>
      </div>
    `;
  });

  return html;
}
