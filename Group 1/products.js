// Define the object mapping product names to image names
const imageNames = {
    "Logitech G PRO X": "Logitech G PRO X.png",
    "Logitech G213 Prodigy": "Logitech G213 Prodigy.png",
    "Logitech G513 Carbon": "Logitech G513 Carbon.png",
    "Logitech G710+": "Logitech G710+.png"
    // Add more product names and image names as needed here
};
let shoppingCart = []; // Global shopping cart array to store cart items
// Function to update the cart count displayed in the header
function updateCartCount() {
    const cartCount = shoppingCart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
}
function saveCartToStorage() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}
// Function to add an item to the shopping cart
function addToCart(productName, productPrice, productImage) {
    const quantity = 1; // You can set the initial quantity to 1 or let users specify it
    const cartItem = {
        name: productName,
        price: productPrice,
        quantity: quantity,
        imageName: productImage
    };
    shoppingCart.push(cartItem); // Add the item to the shopping cart
    updateCartCount(); // Update cart count displayed in the header
    displayShoppingCart(); // Update shopping cart page
    saveCartToStorage(); // Save the updated cart data to session storage
}
// Function to display shopping cart items
function displayShoppingCart() {
    if (window.location.pathname.includes('shopping-cart.html')) {
        const cartItemsContainer = document.querySelector('.cart-items');
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
 // Add event listeners to all Add to Cart buttons when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Get product details
            const productItem = event.target.closest('.product-item');
            let productName;
            const productNameElement1 = productItem.querySelector('.product-name-1');
            const productNameElement2 = productItem.querySelector('.product-name-2');
            const productNameElement3 = productItem.querySelector('.product-name-3');
            const productNameElement4 = productItem.querySelector('.product-name-4');

            if (productItem.classList.contains('product-1')) {
                productName = productNameElement1.innerText;
            } else if (productItem.classList.contains('product-2')) {
                productName = productNameElement2.innerText;
            } else if (productItem.classList.contains('product-3')) {
                productName = productNameElement3.innerText;
            } else if (productItem.classList.contains('product-4')) {
                productName = productNameElement4.innerText;
            } else {
                productName = "Unknown Product";
            }

            const productPrice = parseFloat(productItem.querySelector('.price').innerText.replace('$', ''));
            const productImage = productItem.querySelector('img').getAttribute('src');
            addToCart(productName, productPrice, productImage);
        });
    });

    // Check for saved shopping cart data when the page loads
    checkForSavedCart();
});
 
// Function to check for shopping cart data in sessionStorage when the page loads
function checkForSavedCart() {
    const savedCart = sessionStorage.getItem('shoppingCart');
    if (savedCart) {
        shoppingCart = JSON.parse(savedCart);
        // Update cart count displayed in the header
        updateCartCount();
    }
}

// Call the function to check for saved shopping cart data when the page loads
document.addEventListener('DOMContentLoaded', checkForSavedCart);


