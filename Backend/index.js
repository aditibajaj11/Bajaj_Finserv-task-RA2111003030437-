const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// GET route for root
app.get('/', (req, res) => {
    res.send('Welcome to the backend!');
});

// Helper function to find the highest alphabet
const findHighestAlphabet = (alphabets) => {
    if (alphabets.length === 0) return [];
    return [alphabets.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? -1 : 1)[0]];
};

// Helper function to generate user_id
const generateUserId = (firstName, lastName, dob) => {
    const formattedDob = dob.split('-').reverse().join('');  // Format to ddmmyyyy
    return `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${formattedDob}`;
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

        // Generate user_id
        const user_id = generateUserId('aditi', 'bajaj', '02-08-2024'); // Replace with actual values

        // Construct response
        const response = {
            is_success: true,
            user_id,  // Generated user_id
            email: "ab4860@srmist.edu.in", // Replace with your email
            roll_number: "RA2111003030437", // Replace with your roll number
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

