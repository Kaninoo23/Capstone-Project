document.addEventListener('DOMContentLoaded', function() {
    const buttonContainer = document.getElementById('buttonContainer');

    if (buttonContainer) {
        buttonContainer.innerHTML = ''; // Clear existing content

        createButton('Home', 'home.html');

    } else {
        console.error('Element with id="buttonContainer" not found.');
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

    const signupForm = document.getElementById('signupForm');

    if (signupForm) {
        signupForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent default form submission

            const formData = {
                name: signupForm.elements.name.value,
                email: signupForm.elements.email.value,
                password: signupForm.elements.password.value,
                address: signupForm.elements.address.value,
                city: signupForm.elements.city.value,
                state: signupForm.elements.state.value,
                zip: signupForm.elements.zip.value
            };

            try {
                const response = await fetch('http://localhost:3000/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                console.log('Signup successful:', result);
                alert('Signup successful!'); // Show success message
                
            } catch (error) {
                console.error('Error signing up:', error);
                alert('Signup failed. Please try again later.');
            }
        });
    } else {
        console.error('Form with id="signupForm" not found.');
    }
});
