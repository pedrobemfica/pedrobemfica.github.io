

// OLD
export function openCartView() {}

export function openPaymentView() {}

let cart = [];

function addToCart(productName, productPrice) {
    const product = { name: productName, price: productPrice };
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';

    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartDiv.appendChild(itemDiv);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
    cartDiv.appendChild(totalDiv);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
