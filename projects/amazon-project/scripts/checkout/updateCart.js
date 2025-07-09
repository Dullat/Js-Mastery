import { updateCartQuantity, cart } from "../../data/cart.js"
import { renderOrderSummary } from "./orderSummary.js";
import { paymentSummary } from "./paymentSummary.js";

export function renderUpdateCart(cartProductId) {
    let quantity;
    let tempQuantity;
    console.log(cartProductId, "jhdkjafkh");
    

    cart.forEach(cartItem => {
        if(cartItem.productId === cartProductId){
            quantity = cartItem.quantity            
        }
    });

    tempQuantity = quantity


    let html = `
        <div class="js-update-cart-container" data-cart-product-id="${cartProductId}" 
    style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); height: 150px; width: 200px; background-color: white; border-radius: 1rem; border: 1px solid gray; font-size:1.3rem; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
    <div class="" style="display: flex; gap: 1rem; text-align: center;">
      <button class="js-update-quantity-minus" style="padding: .3rem .7rem;">-</button>
      <div class="js-quantity" style="display: flex; align-items: center;">${tempQuantity}</div>
      <button class="js-update-quantity-plus" style="padding: .3rem .7rem;">+</button>
    </div>
    <button class="js-quantity-update-btn" style="font-size: 1.3rem; background-color: yellow; padding: .2rem .5rem; border: 1px solid gray; border-radius: .3rem">Update</button>
  </div>
    `;

    const updateCartHtml = document.createElement("div")
    updateCartHtml.innerHTML = html


    document.body.appendChild(updateCartHtml)

    document.querySelector('.js-quantity-update-btn').addEventListener('click', (event) => {
        updateCartQuantity(cartProductId, tempQuantity)
        updateCartHtml.remove()

        renderOrderSummary()
        paymentSummary()
    })

    document.querySelector('.js-update-quantity-plus').addEventListener('click', ()=> {
        tempQuantity += 1
        document.querySelector(".js-quantity").textContent = tempQuantity
    })

    document.querySelector('.js-update-quantity-minus').addEventListener('click', ()=> {
        if(tempQuantity === 1){
            return
        }
        tempQuantity -= 1
        document.querySelector(".js-quantity").textContent = tempQuantity
    })

}