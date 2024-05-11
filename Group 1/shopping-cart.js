// Define the object mapping product names to image names
const imageNames = {
    "Logitech G PRO X": "Logitech G PRO X.png",
    "Logitech G213 Prodigy": "Logitech G213 Prodigy.png",
    "Logitech G513 Carbon": "Logitech G513 Carbon.png",
    "Logitech G710+": "Logitech G710+.png"
    // Add more product names and image names as needed here
};
let shoppingCart = []; // Global shopping cart array to store cart items

// Function to display shopping cart items
function displayShoppingCart() {
    if (window.location.pathname.includes('shopping-cart.html')) {
        const cartItemsContainer = document.querySelector('.cart-items');
        console.log (cartItemsContainer)
        // Clear previous cart items
        cartItemsContainer.innerHTML = '';

        // Iterate through each item in the shopping cart and create HTML elements to display them
        shoppingCart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
        
            // Create and append image element
            const itemImageElement = document.createElement('img');
            itemImageElement.src = 'Images/' + imageNames[item.name];
            itemImageElement.alt = item.name;
            cartItemElement.appendChild(itemImageElement);

            // Create and append other elements like name, price, and quantity
            const itemNameElement = document.createElement('span');
            itemNameElement.textContent = item.name;
        
            const itemPriceElement = document.createElement('span');
            itemPriceElement.textContent = `$${item.price}`;
        
            const itemQuantityElement = document.createElement('span');
            itemQuantityElement.textContent = `Quantity: ${item.quantity}`;
        
            cartItemElement.appendChild(itemNameElement);
            cartItemElement.appendChild(itemPriceElement);
            cartItemElement.appendChild(itemQuantityElement);
            cartItemsContainer.appendChild(cartItemElement);
        });

        // Update cart quantity, tax, shipping, and total
        updateCartDetails();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Call displayShoppingCart() to initially display the items when the page loads.
    displayShoppingCart();
});


// Function to update cart details (quantity, tax, shipping, total)
function updateCartDetails() {
    const cartQuantityElement = document.querySelector('.cart-quantity');
    const totalQuantity = shoppingCart.reduce((total, item) => total + item.quantity, 0);
    cartQuantityElement.textContent = totalQuantity;

    const cartTaxElement = document.querySelector('.cart-tax');
    const tax = calculateTax();
    cartTaxElement.textContent = `$${tax.toFixed(2)}`;

    const cartShippingElement = document.querySelector('.cart-shipping');
    const shipping = calculateShipping();
    cartShippingElement.textContent = `$${shipping.toFixed(2)}`;

    const cartTotalElement = document.querySelector('.cart-total');
    const total = calculateTotal();
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Function to calculate tax
function calculateTax() {
    // Implement your tax calculation logic here
    return 0; // Placeholder value, replace it with actual calculation
}

// Function to calculate shipping
function calculateShipping() {
    // Implement your shipping calculation logic here
    return 5; // Placeholder value, replace it with actual calculation
}

// Function to calculate total price
function calculateTotal() {
    let totalPrice = shoppingCart.reduce((total, item) => total + (item.price * item.quantity), 0);
    totalPrice += calculateTax();
    totalPrice += calculateShipping();
    return totalPrice;
}

// Function to check for shopping cart data in sessionStorage when the page loads
function checkForSavedCart() {
    const savedCart = sessionStorage.getItem('shoppingCart');
    if (savedCart) {
        shoppingCart = JSON.parse(savedCart);
        // Update cart count displayed in the header
        updateCartDetails();
    }
}

// Call the function to check for saved shopping cart data when the page loads
document.addEventListener('DOMContentLoaded', checkForSavedCart);
