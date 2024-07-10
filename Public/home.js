document.addEventListener('DOMContentLoaded', function() {
    const buttonContainer = document.getElementById('buttonContainer');

    // Check if running in Node.js environment
    const isNode = typeof process !== 'undefined' && process.release && process.release.name === 'node';

    // Clear existing content in buttonContainer to prevent duplication
    buttonContainer.innerHTML = '';

    if (isNode) {
        // Create <a> elements for Node.js environment
        createNavLink('Products', '/products');
        createNavLink('About', '#'); // Replace '#' with actual link
        createNavLink('Contact', '#'); // Replace '#' with actual link
        createNavLink('Shopping Cart', '/shopping-cart');
        createNavLink('Sign Up', '/signup'); // This will only appear in Node.js environment
    } else {
        // Create <button> elements for local environment
        createButton('Products', 'products.html');
        createButton('About', '#'); // Replace '#' with actual link
        createButton('Contact', '#'); // Replace '#' with actual link
        createButton('Shopping Cart', 'shopping-cart.html');

        // Append Sign Up link to logo-container only if it's not the sign-up page
        if (!document.body.classList.contains('signup-page')) {
            const logoContainer = document.querySelector('.logo-container');
            const signUpLink = document.createElement('a');
            signUpLink.textContent = 'Sign Up';
            signUpLink.classList.add('common-link');
            signUpLink.href = 'signup.html';
            logoContainer.appendChild(signUpLink);
        }
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

    // Function to update the cart count (assuming it's still needed)
    function updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            const shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart')) || [];
            const cartCount = shoppingCart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = cartCount;
            cartCountElement.style.visibility = cartCount > 0 ? 'visible' : 'hidden'; // Show only if cartCount > 0
            console.log('Cart count updated:', cartCount);
        } else {
            console.error('Cart count element not found.');
        }
    }

    // Function to save shopping cart to sessionStorage (assuming it's still needed)
    function saveCartToStorage(shoppingCart) {
        sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    }

    // Function to check for saved shopping cart data in sessionStorage when the page loads (assuming it's still needed)
    function checkForSavedCart() {
        const savedCart = sessionStorage.getItem('shoppingCart');
        if (savedCart) {
            const shoppingCart = JSON.parse(savedCart);
            updateCartCount(); // Update cart count displayed in the header
        }
    }

    // Call the function to check for saved shopping cart data when the page loads (assuming it's still needed)
    checkForSavedCart();

});
