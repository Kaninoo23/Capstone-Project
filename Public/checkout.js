document.addEventListener('DOMContentLoaded', function() {
    const buttonContainer = document.getElementById('buttonContainer');

    // Check if running in Node.js environment
    const isNode = typeof process !== 'undefined' && process.release && process.release.name === 'node';

    // Clear existing content in buttonContainer to prevent duplication
    buttonContainer.innerHTML = '';

    if (isNode) {
        // Create <a> elements for Node.js environment
        createNavLink('Home', '/home');
        createNavLink('Products', '/products');
        createNavLink('About', '#'); // Replace '#' with actual link
        createNavLink('Contact', '#'); // Replace '#' with actual link
        createNavLink('Shopping Cart', '/shopping-cart');

    } else {
        // Create <button> elements for local environment
        createButton('Home', 'home.html');
        createButton('Products', 'products.html');
        createButton('About', '#'); // Replace '#' with actual link
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


    var sameBillingCheckbox = document.getElementById('same_billing_address');
    sameBillingCheckbox.addEventListener('change', function() {
        var shippingName = document.getElementsByName('shipping_name')[0].value;
        var shippingAddress = document.getElementsByName('shipping_address')[0].value;
        var shippingCity = document.getElementsByName('shipping_city')[0].value;
        var shippingState = document.getElementsByName('shipping_state')[0].value;
        var shippingZip = document.getElementsByName('shipping_zip')[0].value;
        var shippingCountry = document.getElementsByName('shipping_country')[0].value;

        if (this.checked) {
            document.getElementById('billing_name').value = shippingName;
            document.getElementById('billing_address').value = shippingAddress;
            document.getElementById('billing_city').value = shippingCity;
            document.getElementById('billing_state').value = shippingState;
            document.getElementById('billing_zip').value = shippingZip;
            document.getElementById('billing_country').value = shippingCountry;
        } else {
            document.getElementById('billing_name').value = '';
            document.getElementById('billing_address').value = '';
            document.getElementById('billing_city').value = '';
            document.getElementById('billing_state').value = '';
            document.getElementById('billing_zip').value = '';
            document.getElementById('billing_country').value = '';
        }
    });

    
});
