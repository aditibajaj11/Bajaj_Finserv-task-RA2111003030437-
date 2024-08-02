const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Helper function to find the highest alphabet
const findHighestAlphabet = (alphabets) => {
    if (alphabets.length === 0) return [];
    return [alphabets.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? -1 : 1)[0]];
};

// POST route
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        // Validate input
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: 'Invalid input. "data" should be an array.' });
        }

        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));

        // Find the highest alphabet
        const highest_alphabet = findHighestAlphabet(alphabets);

        // Construct response
        const response = {
            is_success: true,
            user_id: "aditi_bajaj_02082024", // Replace with your user_id format
            email: "aditi.bajaj@college.edu", // Replace with your email
            roll_number: "123456", // Replace with your roll number
            numbers,
            alphabets,
            highest_alphabet
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, message: 'Server error', error: error.message });
    }
});

// GET route
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
