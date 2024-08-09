// Define shoppingCart globally
let shoppingCart = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');

    const buttonContainer = document.getElementById('buttonContainer');
    if (!buttonContainer) {
        console.error('Button container not found');
        return;
    }
    buttonContainer.innerHTML = ''; // Clear existing content

    createNavigationButtons();

    function createNavigationButtons() {
        createButton('Home', 'home.html');
        createButton('About', 'about.html'); 
        createButton('Contact', 'contact.html');
        createShoppingCartButton('Shopping Cart', 'shopping-cart.html');
    }

    function createButton(text, url) {
        const button = document.createElement('button');
        button.classList.add('common-button');
        button.textContent = text;
        button.addEventListener('click', function() {
            window.location.href = url;
        });
        buttonContainer.appendChild(button);
    }

    function createShoppingCartButton(text, url) {
        // Remove existing cart button if it exists
        const existingCartButton = document.querySelector('.common-button.cart');
        if (existingCartButton) {
            existingCartButton.remove();
        }

        const button = document.createElement('button');
        button.classList.add('common-button', 'cart'); // Add a specific class for the cart button
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

    // Event listeners for Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    if (addToCartButtons.length === 0) {
        console.error('No Add to Cart buttons found');
    }
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const productCard = event.target.closest('.product-card');
            if (!productCard) {
                console.error('Product card not found');
                return;
            }

            const productNameElement = productCard.querySelector('.product-details .product-name');
            const productPriceElement = productCard.querySelector('.product-details .price');
            const productImageElement = productCard.querySelector('.product-image');

            if (!productNameElement || !productPriceElement || !productImageElement) {
                console.error('Required product details not found');
                return;
            }

            const productName = productNameElement.textContent.trim();
            const productPrice = parseFloat(productPriceElement.textContent.replace('$', ''));
            const productImage = productImageElement.src;
            const quantity = parseInt(productCard.querySelector('.quantity-input').value);
            const subtotal = productPrice * quantity;

            addToCart(productName, productPrice, productImage, subtotal, quantity);
        });
    });

    function addToCart(productName, productPrice, productImage, subtotal, quantity) {
        const cartItem = {
            name: productName,
            price: productPrice,
            quantity: quantity,
            subtotal: subtotal,
            imageName: productImage
        };

        shoppingCart.push(cartItem);
        updateCartCount();
        saveCartToStorage();

        console.log('Item added to cart:', productName);
        console.log('Shopping cart:', shoppingCart);
    }

    function updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        if (cartCountElements.length === 0) {
            console.error('No cart count elements found');
            return;
        }
        cartCountElements.forEach(cartCountElement => {
            const cartCount = shoppingCart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = cartCount;
            cartCountElement.style.visibility = cartCount > 0 ? 'visible' : 'hidden';
            console.log('Cart count updated:', cartCount);
        });
    }

    function saveCartToStorage() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    }

    function checkForSavedCart() {
        const savedCart = sessionStorage.getItem('shoppingCart');
        if (savedCart) {
            shoppingCart = JSON.parse(savedCart);
            updateCartCount();
        }
    }

    checkForSavedCart();
});
