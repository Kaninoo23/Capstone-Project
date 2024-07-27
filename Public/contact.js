let shoppingCart = []; // Define shoppingCart globally

document.addEventListener('DOMContentLoaded', function() {
    // Get the container where buttons will be added
    const buttonContainer = document.getElementById('buttonContainer');
    
    buttonContainer.innerHTML = ''; // Clear existing content

    // Create navigation buttons
    createNavigationButtons();

    // Function to create navigation buttons
    function createNavigationButtons() {
        // Logic based on your specific requirements for navigation buttons
        const buttonContainer = document.getElementById('buttonContainer');
        createButton('Home', 'home.html');
        createButton('Products', 'products.html'); 
        createButton('Contact', 'contact.html');
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

    // Function to create a link element (if needed for other purposes)
    function createNavLink(text, url) {
        const link = document.createElement('a');
        link.classList.add('common-link');
        link.textContent = text;
        link.href = url;
        buttonContainer.appendChild(link);
    }
     // Function to check for saved cart items
     function checkForSavedCart() {
        const savedCart = sessionStorage.getItem('shoppingCart');
        if (savedCart) {
            shoppingCart = JSON.parse(savedCart);
            updateCartCount(); // Update cart count displayed in the header
        }
    }
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

    checkForSavedCart();
});
