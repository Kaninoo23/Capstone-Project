let shoppingCart = []; // Define shoppingCart globally

document.addEventListener('DOMContentLoaded', function() {
    
    const buttonContainer = document.getElementById('buttonContainer');

    buttonContainer.innerHTML = ''; // Clear existing content

    createNavigationButtons();

    function createNavigationButtons() {
        // Adjust logic based on your specific requirements for navigation buttons
        const buttonContainer = document.getElementById('buttonContainer');
        createButton('Home', 'home.html');
        createButton('About', 'about.html'); 
        createButton('Contact', '#'); // Replace '#' with actual link
        createButton('Shopping Cart', 'shopping-cart.html');
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

    // Add event listeners to all Add to Cart buttons when the DOM is fully loaded
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const productCard = event.target.closest('.product-card');
            if (!productCard) {
                console.error('Product card not found');
                return;
            }

            // Retrieve product details
            const productNameElement = productCard.querySelector('.product-details .product-name');
            const productPriceElement = productCard.querySelector('.product-details .price');
            const productImageElement = productCard.querySelector('.product-image');

            // Check if all required product details are found
            if (!productNameElement || !productPriceElement || !productImageElement) {
                console.error('Required product details not found');
                return;
            }

            const productName = productNameElement.textContent.trim();
            const productPrice = parseFloat(productPriceElement.textContent.replace('$', ''));
            const productImage = productImageElement.src;
            const quantity = parseInt(productCard.querySelector('.quantity-input').value);
            const subtotal = productPrice * quantity;

            // Add item to shopping cart
            addToCart(productName, productPrice, productImage, subtotal, quantity);
        });
    });

    // Function to add an item to the shopping cart
    function addToCart(productName, productPrice, productImage, subtotal, quantity) {
        const cartItem = {
            name: productName,
            price: productPrice,
            quantity: quantity,
            subtotal: subtotal,
            imageName: productImage
        };

        shoppingCart.push(cartItem);
        updateCartCount(); // Update cart count displayed in the header
        saveCartToStorage(); // Save the updated cart data to session storage

        console.log('Item added to cart:', productName);
        console.log('Shopping cart:', shoppingCart);
    }

    // Function to update the cart count displayed in the header
    function updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            const cartCount = shoppingCart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = cartCount;
            cartCountElement.style.visibility = cartCount > 0 ? 'visible' : 'hidden'; // Show only if cartCount > 0
            console.log('Cart count updated:', cartCount);
        } else {
            console.error('Cart count element not found.');
        }
    }

    // Function to save cart data to sessionStorage
    function saveCartToStorage() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    }

    // Function to check for saved shopping cart data in sessionStorage when the page loads
    function checkForSavedCart() {
        const savedCart = sessionStorage.getItem('shoppingCart');
        if (savedCart) {
            shoppingCart = JSON.parse(savedCart);
            updateCartCount(); // Update cart count displayed in the header
        }
    }

    // Call the function to check for saved shopping cart data when the page loads
    checkForSavedCart();
});
