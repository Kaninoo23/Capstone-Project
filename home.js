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
    } else {
        // Create <button> elements for local environment
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
});
