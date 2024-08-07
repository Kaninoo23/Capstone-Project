document.addEventListener('DOMContentLoaded', function() {
    const buttonContainer = document.getElementById('buttonContainer');

    // Clear existing content in buttonContainer to prevent duplication
    buttonContainer.innerHTML = '';

    // Create navigation buttons or links based on environment
    if (typeof process !== 'undefined' && process.release && process.release.name === 'node') {
        createNavLink('Home', '/home');
        createNavLink('Products', '/products');
        createNavLink('About', '#'); 
        createNavLink('Contact', '#'); 
        createNavLink('Shopping Cart', '/shopping-cart');
    } else {
        createButton('Home', 'home.html');
        createButton('Products', 'Products.html');
        createButton('About', 'about.html');
        createButton('Contact', 'contact.html');
        createShoppingCartButton('Shopping Cart', 'shopping-cart.html');
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

    // Function to create a shopping cart button with cart count
    function createShoppingCartButton(text, url) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add('common-button'); // Ensure this class has appropriate CSS styles
        
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

    // Function to create an <a> element
    function createNavLink(text, url) {
        const link = document.createElement('a');
        link.textContent = text;
        link.href = url;
        link.classList.add('common-link'); // Ensure this class has appropriate CSS styles
        buttonContainer.appendChild(link);
    }

    // Function to update the cart count
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

    // Call updateCartCount() 
    updateCartCount();
});
