const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./authenticateToken'); // Import your middleware

const app = express();
const JWT_SECRET = 'your-secret-key';

// Route to verify the token (for client-side verification)
app.post('/verify-token', authenticateToken, (req, res) => {
    // If the token is valid, we can return a success message
    res.json({ message: 'Token is valid', user: req.user });
});

// Other routes
app.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to your profile', user: req.user });
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
