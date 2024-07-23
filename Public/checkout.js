document.addEventListener('DOMContentLoaded', function() {
    const buttonContainer = document.getElementById('buttonContainer');

    // Clear existing content in buttonContainer to prevent duplication
    buttonContainer.innerHTML = '';

    // Function to create navigation buttons or links based on environment
    if (typeof process !== 'undefined' && process.release && process.release.name === 'node') {
        createNavLink('Home', '/home');
        createNavLink('Products', '/products');
        createNavLink('About', '#'); // Replace '#' with actual link
        createNavLink('Contact', '#'); // Replace '#' with actual link
        createNavLink('Shopping Cart', '/shopping-cart');
    } else {
        createButton('Home', 'home.html');
        createButton('Products', 'Products.html');
        createButton('About', '#'); // Replace '#' with actual link
        createButton('Contact', '#'); // Replace '#' with actual link
        createButton('Shopping Cart', 'shopping-cart.html');
    }

    // Function to create a button element
    function createButton(text, url) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add('common-button'); // Ensure this class has appropriate CSS styles
        button.addEventListener('click', function() {
            window.location.href = url;
        });
        buttonContainer.appendChild(button);
    }

    // Function to create an <a> element
    function createNavLink(text, url) {
        const link = document.createElement('a');
        link.textContent = text;
        link.href = url;
        link.classList.add('common-link'); // Ensure this class has appropriate CSS styles
        buttonContainer.appendChild(link);
    }

    // Function to update the cart count (if needed)
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

    // Call updateCartCount() or any other necessary functions
    updateCartCount();
});
