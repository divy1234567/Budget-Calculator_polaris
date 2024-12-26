// Function to handle login form submission
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const errorElement = document.getElementById('loginError');

    // Get stored users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};

    // Check if user exists and password matches
    if (users[username] && users[username].password === password) {
        // Store logged in user
        localStorage.setItem('currentUser', username);
        // Store login timestamp
        localStorage.setItem('loginTime', new Date().toISOString());
        // Redirect to homepage
        window.location.href = 'Homepage.html';
    } else {
        errorElement.textContent = 'Invalid username or password';
        errorElement.style.display = 'block';
    }
}

// Function to handle signup form submission
function handleSignup(event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorElement = document.getElementById('signupError');

    // Basic validation
    if (password.length < 6) {
        errorElement.textContent = 'Password must be at least 6 characters long';
        errorElement.style.display = 'block';
        return;
    }

    if (password !== confirmPassword) {
        errorElement.textContent = 'Passwords do not match';
        errorElement.style.display = 'block';
        return;
    }

    // Get stored users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};

    // Check if username already exists
    if (users[username]) {
        errorElement.textContent = 'Username already exists';
        errorElement.style.display = 'block';
        return;
    }

    // Store new user
    users[username] = {
        password: password,
        email: email,
        expenses: [],
        monthlyLimit: 1000, // Default monthly limit
        yearlyLimit: 12000, // Default yearly limit
        joinDate: new Date().toISOString()
    };
    localStorage.setItem('users', JSON.stringify(users));

    // Automatically log in the new user
    localStorage.setItem('currentUser', username);
    localStorage.setItem('loginTime', new Date().toISOString());
    window.location.href = 'Homepage.html';
}

// Function to toggle between login and signup forms
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    // Clear any error messages
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('signupError').style.display = 'none';
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }
}

// Check if user is already logged in
window.addEventListener('load', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'Homepage.html';
    }
});