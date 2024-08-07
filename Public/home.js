// Define shoppingCart globally
let shoppingCart = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');

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
                const buttonContainer = document.getElementById('buttonContainer');
                buttonContainer.innerHTML = '';

                // Create navigation buttons based on environment
                createNavigationButtons();

                // Event listener for logout button
                const logoutButton = document.getElementById('logoutButton');
                logoutButton.addEventListener('click', function() {
                    // Logout logic
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
                        // Handle logout error
                    });
                });

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
        createButton('Products', 'products.html');
        createButton('About', 'about.html'); 
        createButton('Contact', 'contact.html'); 
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
        document.getElementById('buttonContainer').appendChild(button);
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
        document.getElementById('buttonContainer').appendChild(button);

        // Update cart count after appending the button
        updateCartCount();
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
    
    // Function to update the cart count displayed in the header
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

    // Function to fetch visitor data from ipinfo.io
    async function fetchVisitorData() {
        try {
            // Fetch visitor data including IP and location
            const response = await fetch("https://ipinfo.io/json");
            const jsonResponse = await response.json();
            
            console.log('Visitor IP:', jsonResponse.ip);
            console.log('Visitor Country:', jsonResponse.country);
            
            // Extract latitude and longitude
            const { loc } = jsonResponse;
            const [latitude, longitude] = loc.split(',');
            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);
            
            // Fetch forecast data based on coordinates
            const pointsUrl = `https://api.weather.gov/points/${latitude},${longitude}`;
            const pointsResponse = await fetch(pointsUrl);
            const pointsData = await pointsResponse.json();
            
            // Extract forecast URLs
            const forecastUrl = pointsData.properties.forecast;
            const forecastHourlyUrl = pointsData.properties.forecastHourly;
            const forecastGridDataUrl = pointsData.properties.forecastGridData;
            
            // Fetch the forecasts
            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();
            
            const forecastHourlyResponse = await fetch(forecastHourlyUrl);
            const forecastHourlyData = await forecastHourlyResponse.json();
            
            const forecastGridDataResponse = await fetch(forecastGridDataUrl);
            const forecastGridData = await forecastGridDataResponse.json();
            
            console.log('Forecast Data:', forecastData);
            console.log('Forecast Hourly Data:', forecastHourlyData);
            console.log('Forecast Grid Data:', forecastGridData);
            
            // Update UI with weather information
            updateWeatherUI(forecastData.properties.periods[0]); // Update UI with the first period of the forecast
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors
        }
    }
    
    function updateWeatherUI(weatherData) {
        // Displaying weather information
        const weatherInfoContainer = document.getElementById('weather-info');
        weatherInfoContainer.innerHTML = `
            <h2>Weather Information</h2>
            <p>Temperature: ${weatherData.temperature} °F</p>
            <p>Description: ${weatherData.shortForecast}</p>
            <img src="${weatherData.icon}" alt="Weather Icon">
        `;
    }

    // Call the function to check login status when the page loads
    checkLoginStatus();

    // Call the function to fetch visitor data and weather
    fetchVisitorData();

});
