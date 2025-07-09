export let cart = JSON.parse(localStorage.getItem('cart'))

if (!cart) cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: 3
    },
];

export function addToCart(productId) {
    let matchingItem;
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item
        }
    })

    if (matchingItem) {
        matchingItem.quantity += 1
    } else {
        cart.push({
            productId,
            quantity: 1,
            deliveryOptionId: 3
        })
    }

    saveToStorage()
}

export function removeFromCart(productId) {
    const newCart = []


    if (productId) {
        cart.forEach((item) => {
            if (item.productId !== productId) {
                newCart.push(item)
            }
        })

        cart = newCart
        saveToStorage()

    }
}

export function updateCartQuantity(productId, newQuantity){
    cart.forEach(cartItem => {
        if(productId === cartItem.productId){
            cartItem.quantity = newQuantity
        }
    })

    saveToStorage()
}

function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart))
}

export function updateDeliveryOption(productId, deliveryOption){
    console.log(productId, deliveryOption);
    
    cart.forEach(cartItem => {
        if(cartItem.productId === productId){
            cartItem.deliveryOptionId = deliveryOption
        }
    })

    saveToStorage()
}