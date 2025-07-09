function Cart(type) {
    const cart = {
        cartItems: undefined,

        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(`cart-${type}`))

            if (!this.cartItems) this.cartItems = [
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryOptionId: 3
                },
            ];
        },

        saveToStorage() {
            localStorage.setItem(`cart-${type}`, JSON.stringify(this.cartItems))
        },

        addToCart(productId) {
            let matchingItem;
            this.cartItems.forEach((item) => {
                if (productId === item.productId) {
                    matchingItem = item
                }
            })

            if (matchingItem) {
                matchingItem.quantity += 1
            } else {
                this.cartItems.push({
                    productId,
                    quantity: 1,
                    deliveryOptionId: 1
                })
            }

            this.saveToStorage()
        },

        removeFromCart(productId) {
            const newCart = []
            if (productId) {
                this.cartItems.forEach((item) => {
                    if (item.productId !== productId) {
                        newCart.push(item)
                    }
                })

                this.cartItems = newCart
                this.saveToStorage()
            }
        },
        updateCartQuantity(productId, newQuantity) {
            this.cartItems.forEach(cartItem => {
                if (productId === cartItem.productId) {
                    cartItem.quantity = newQuantity
                }
            })
            this.saveToStorage()
        },
        updateDeliveryOption(productId, deliveryOption) {
            console.log(productId, deliveryOption);

            this.cartItems.forEach(cartItem => {
                if (cartItem.productId === productId) {
                    cartItem.deliveryOptionId = deliveryOption
                }
            })

            this.saveToStorage()
        }
    }

    return cart
}

const cart = Cart("business")

cart.loadFromStorage()

cart.addToCart('77919bbe-0e56-475b-adde-4f24dfed3a04')

console.log(cart)

const cart2 = Cart("dullat")
cart2.loadFromStorage()
cart2.addToCart('77919bbe-0e56-475b-adde-4f24dfed3a04')