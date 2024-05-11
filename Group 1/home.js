
function updateCartCount(cart) {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').innerText = cartCount;
}