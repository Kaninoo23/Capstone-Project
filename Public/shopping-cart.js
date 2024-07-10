// Define shoppingCart variable globally
let shoppingCart = [];

document.addEventListener('DOMContentLoaded', function() {
    const buttonContainer = document.querySelector('.button-container'); // Corrected selector

    // Check if running in Node.js environment
    const isNode = typeof process !== 'undefined' && process.release && process.release.name === 'node';
    
    buttonContainer.innerHTML = ''; // Clear existing content

    // Create buttons or links based on environment
    if (isNode) {
        createNavLink('Home', '/home');
        createNavLink('Products', '/products');
        createNavLink('About', '#'); // Replace '#' with actual link
        createNavLink('Contact', '#'); // Replace '#' with actual link
    } else {
        createButton('Home', 'home.html');
        createButton('Products', 'products.html');
        createButton('About', '#'); // Replace '#' with actual link
        createButton('Contact', '#'); // Replace '#' with actual link
    }

    // Function to create a button element
    function createButton(text, url) {
        const button = document.createElement('button');
        button.classList.add('common-button');
        button.textContent = text;
        button.addEventListener('click', function() {
            window.location.href = url;
        });
        buttonContainer.appendChild(button);
    }

    // Function to create an <a> element
    function createNavLink(text, url) {
        const link = document.createElement('a');
        link.classList.add('common-link');
        link.textContent = text;
        link.href = url;
        buttonContainer.appendChild(link);
    }

    // Define the object mapping product names to image names
    const imageNames = {
        "Logitech G PRO X": "Logitech G PRO X.png",
        "Logitech G213 Prodigy": "Logitech G213 Prodigy.png",
        "Logitech G513 Carbon": "Logitech G513 Carbon.png",
        "Logitech G710+": "Logitech G710+.png"
        // Add more product names and image names as needed here
    };

    checkForSavedCart(); // Check if there are saved items in sessionStorage
    displayShoppingCart(); // Display the shopping cart items on the page
     
    const checkoutButton = document.querySelector('.checkout-button');
    checkoutButton.addEventListener('click', function() {
        window.location.href = 'checkout.html'; // Redirect to checkout page
    });
    // Add event listeners to all Add to Cart buttons when the DOM is fully loaded
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const productCard = event.target.closest('.product-card');
            if (!productCard) return;

            const productNameElement = productCard.querySelector('.product-details .product-name');
            const productPriceElement = productCard.querySelector('.product-details .price');
            const productImageElement = productCard.querySelector('.product-image');

            if (!productNameElement || !productPriceElement || !productImageElement) return;

            const productName = productNameElement.textContent.trim();
            const productPrice = parseFloat(productPriceElement.textContent.replace('$', ''));
            const productImage = imageNames[productName]; // Correctly reference image name
            const quantity = 1; // Initial quantity
            const subtotal = productPrice * quantity;

            addToCart(productName, productPrice, productImage, quantity, subtotal);
        });
    });

    // Function to display shopping cart items
    function displayShoppingCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        if (!cartItemsContainer) {
            console.error('Cart items container not found.');
            return;
        }

        cartItemsContainer.innerHTML = ''; // Clear previous cart items

        // Group items by name
        const groupedItems = {};
        shoppingCart.forEach(item => {
            if (!groupedItems[item.name]) {
                groupedItems[item.name] = { ...item, quantity: 0 };
            }
            groupedItems[item.name].quantity += item.quantity;
        });

        // Create HTML elements for each grouped item
        Object.values(groupedItems).forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');

            const itemImageElement = document.createElement('img');
            itemImageElement.src = item.imageName; // Correctly reference image name
            itemImageElement.alt = item.name;
            cartItemElement.appendChild(itemImageElement);

            const itemNameElement = document.createElement('span');
            itemNameElement.textContent = item.name;

            const itemPriceElement = document.createElement('span');
            itemPriceElement.textContent = `$${item.price.toFixed(2)}`;

            const itemQuantityElement = document.createElement('span');
            itemQuantityElement.textContent = `Quantity: ${item.quantity}`;

            const itemSubtotalElement = document.createElement('span');
            itemSubtotalElement.textContent = `Subtotal: $${(item.price * item.quantity).toFixed(2)}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-from-cart-button');
            removeButton.addEventListener('click', function() {
                removeCartItem(item.name);
            });

            cartItemElement.appendChild(itemNameElement);
            cartItemElement.appendChild(itemPriceElement);
            cartItemElement.appendChild(itemQuantityElement);
            cartItemElement.appendChild(itemSubtotalElement);
            cartItemElement.appendChild(removeButton);

            cartItemsContainer.appendChild(cartItemElement);
        });

        updateCartDetails(); // Update cart details
    }

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

        const cartSubtotalElement = document.querySelector('.cart-subtotal');
        if (cartSubtotalElement) {
            const subtotal = calculateSubtotal();
            cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        } else {
            console.error("Element with class 'cart-subtotal' not found.");
        }

        const cartTotalElement = document.querySelector('.cart-total');
        if (cartTotalElement) {
            const total = calculateTotal();
            cartTotalElement.textContent = `$${total.toFixed(2)}`;
        } else {
            console.error("Element with class 'cart-total' not found.");
        }
    }

    // Function to calculate subtotal
    function calculateSubtotal() {
        return shoppingCart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Function to calculate tax (dummy implementation)
    function calculateTax() {
        return 2; // Placeholder value, replace with actual tax calculation
    }

    // Function to calculate shipping (dummy implementation)
    function calculateShipping() {
        return 5; // Placeholder value, replace with actual shipping calculation
    }

    // Function to calculate total price
    function calculateTotal() {
        const subtotal = calculateSubtotal();
        const tax = calculateTax();
        const shipping = calculateShipping();
        return subtotal + tax + shipping;
    }

    // Function to check for shopping cart data in sessionStorage when the page loads
    function checkForSavedCart() {
        const savedCart = sessionStorage.getItem('shoppingCart');
        if (savedCart) {
            shoppingCart = JSON.parse(savedCart);
            updateCartDetails(); // Update cart details if cart data is retrieved
        }
    }

    // Function to save cart data to sessionStorage
    function saveCartToStorage() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    }

    // Function to add an item to the shopping cart
    function addToCart(productName, productPrice, productImage, quantity, subtotal) {
        const cartItem = {
            name: productName,
            price: productPrice,
            quantity: quantity,
            subtotal: subtotal,
            imageName: productImage // Correctly reference image name
        };
        shoppingCart.push(cartItem); // Add item to cart
        updateCartDetails(); // Update cart details displayed
        saveCartToStorage(); // Save cart data to sessionStorage
    }

    // Function to remove an item from the shopping cart
    function removeCartItem(productName) {
        shoppingCart = shoppingCart.filter(item => item.name !== productName);
        updateCartDetails(); // Update cart details after removal
        saveCartToStorage(); // Save updated cart to sessionStorage
        displayShoppingCart(); // Redisplay updated cart items
    }
});
