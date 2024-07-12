// home.js
let shoppingCart = []; // Define shoppingCart globally
document.addEventListener('DOMContentLoaded', function() {
    const buttonContainer = document.getElementById('buttonContainer');

    // Function to fetch login status
    function checkLoginStatus() {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        if (!token) {
            redirectToLogin();
            return;
        }

        fetch('/check-login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'same-origin'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.loggedIn) {
                // User is logged in
                document.getElementById('userInfo').textContent = `Welcome, ${data.user.name}!`;
                document.getElementById('logoutButton').style.display = 'inline-block';

                // Clear existing buttons/links
                buttonContainer.innerHTML = '';

                // Create navigation buttons based on environment
                createNavigationButtons();

                // Add event listener for logout button
                const logoutButton = document.getElementById('logoutButton');
                if (logoutButton) {
                    logoutButton.addEventListener('click', function() {
                        fetch('/logout', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            credentials: 'same-origin'
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Logout failed');
                            }
                            localStorage.removeItem('token');
                            redirectToLogin();
                        })
                        .catch(error => {
                            console.error('Logout error:', error);
                            // Display logout error message to user
                        });
                    });
                }

            } else {
                redirectToLogin();
            }
        })
        .catch(error => {
            console.error('Error checking login status:', error);
            redirectToLogin();
        });
    }

    // Function to create navigation buttons based on environment
    function createNavigationButtons() {
        const isNode = typeof process !== 'undefined' && process.release && process.release.name === 'node';

        if (isNode) {
            createNavLink('Products', '/products');
            createNavLink('About', '#');
            createNavLink('Contact', '#');
            createNavLink('Shopping Cart', '/shopping-cart');
        } else {
            createButton('Products', 'products.html');
            createButton('About', '#'); // Replace '#' with actual link
            createButton('Contact', '#'); // Replace '#' with actual link
            createButton('Shopping Cart', 'shopping-cart.html');
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

    
    // Function to redirect to login page
    function redirectToLogin() {
    console.log('Redirecting to login page...');
    const currentLocation = window.location.pathname;
    if (currentLocation !== '/login.html') {
        console.log('Current location:', currentLocation);
        window.location.href = 'login.html';
    }
    }
    
    function checkForSavedCart() {
        const savedCart = sessionStorage.getItem('shoppingCart');
        if (savedCart) {
            shoppingCart = JSON.parse(savedCart);
            updateCartCount(); // Update cart count displayed in the header
        }
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

    // Call the function to check login status when the page loads
    checkLoginStatus();
    checkForSavedCart();
});
