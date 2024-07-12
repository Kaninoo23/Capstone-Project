const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        console.log('Login successful');
        localStorage.setItem('token', data.token);
        window.location.href = '/home.html'; // Redirect to home page after successful login
    })
    .catch(error => {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
    });
});
