const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/User');

// Importing middleware functions
const { AuthenticateJWT } = require('./middleware');
const { deleteToken } = require('./middleware');
const { generateToken } = require('./middleware');


const app = express();
app.use(express.json());

//======================= Connect to MongoDB =======================
try {
    mongoose.connect('mongodb+srv://mohammedsalah235:jwtAuth@jwtauth.wvhp0.mongodb.net/?retryWrites=true&w=majority&appName=jwtAuth', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}

//======================= Routes =======================

// Route to register a new user
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
});


// Route to login a user
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    let token =  generateToken(user._id);

    res.status(200).json({ message: 'Login successful' , token: `${token}` }); // Optionally, you can include a message
});


app.get("/logout", (req, res) => {
    deleteToken();
    res.status(200).json({ message: 'Logout successful' }); // Optionally, you can include a message
});


// Route to get user details
app.get('/user', AuthenticateJWT, async (req, res) => {
    const user = await User.findById(req.user); // return user info
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
});

//======================= Start the server =======================
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
