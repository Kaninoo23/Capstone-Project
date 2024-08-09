let shoppingCart = []; // Define shoppingCart globally

document.addEventListener('DOMContentLoaded', function() {
    // Get the container where buttons will be added
    const buttonContainer = document.getElementById('buttonContainer');
    
    buttonContainer.innerHTML = ''; // Clear existing content

    // Create navigation buttons
    createNavigationButtons();

    // Function to create navigation buttons
    function createNavigationButtons() {
        createButton('Home', 'home.html');
        createButton('Products', 'products.html'); 
        createButton('About', 'about.html');
        createShoppingCartButton('Shopping Cart', 'shopping-cart.html');
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

    // Function to create a shopping cart button with cart count
    function createShoppingCartButton(text, url) {
        const button = document.createElement('button');
        button.classList.add('common-button'); // Ensure this class has appropriate CSS styles
        button.textContent = text;

        // Create cart count span
        const cartCount = document.createElement('span');
        cartCount.className = 'cart-count'; // Ensure this class matches your CSS
        button.appendChild(cartCount);

        button.addEventListener('click', function() {
            window.location.href = url;
        });
        buttonContainer.appendChild(button);

        // Update cart count after appending the button
        updateCartCount();
    }

    // Function to update the cart count
    function updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            const savedCart = sessionStorage.getItem('shoppingCart');
            shoppingCart = savedCart ? JSON.parse(savedCart) : [];
            const cartCount = shoppingCart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = cartCount;
            cartCountElement.style.visibility = cartCount > 0 ? 'visible' : 'hidden'; // Show only if cartCount > 0
            console.log('Cart count updated:', cartCount);
        } else {
            console.error('Cart count element not found.');
        }
    }

    // Check for saved cart items and update cart count
    updateCartCount();
});
