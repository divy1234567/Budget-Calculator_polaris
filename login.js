document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const loginButton = document.getElementById('login-btn');
    const cancelButton = document.getElementById('cancel-btn');
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');
    const rememberMeField = document.getElementById('remember-me');

    // Handle Login Button Click
    loginButton.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent form submission

        // Get user input
        const username = usernameField.value.trim();
        const password = passwordField.value.trim();

        if (username === '' || password === '') {
            alert('Please enter both username and password.');
            return;
        }

        try {
            // Send a POST request to the backend
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                // Login successful
                alert('Login Successful!');

                // Save the JWT token in localStorage (or cookies if you want it to persist)
                localStorage.setItem('authToken', data.token);

                // Optionally, handle "Remember Me" functionality
                if (rememberMeField.checked) {
                    localStorage.setItem('rememberMe', 'true');
                }

                // Redirect to the profile or dashboard page
                window.location.href = 'profile.html';
            } else {
                // If authentication failed
                alert(data.message || 'Authentication failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during authentication. Please try again.');
        }
    });

    // Handle Cancel Button Click
    cancelButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirect to the homepage or previous page
    });
});

// login.js
document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Store the token in localStorage (or sessionStorage)
            localStorage.setItem('authToken', data.token);

            // Redirect to the homepage after successful login
            window.location.href = '/index.html'; // Redirect to homepage
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging in');
    }
});
