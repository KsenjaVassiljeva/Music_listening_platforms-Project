const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const Albums = require('./models/albums'); // Import Albums directly
const Artist = require('./models/artist'); // Import Artist directly
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_TOKEN = 'secret-admin-token'; // Replace with your secure token for admin registration

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/albums', async (req, res) => {
    try {
        const albums = await Albums.findAll();
        res.json(albums);
    } catch (error) {
        console.error('Error fetching albums:', error);
        res.status(500).json({ error: 'An error occurred while fetching albums.' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

// Implementing the login route
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email); // Assuming this method exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Use bcrypt to compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
});

app.post('/auth/register', async (req, res) => {
    const { name, email, password, adminToken } = req.body;

    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email.' });
        }

        const isAdmin = adminToken === ADMIN_TOKEN;
        const newUser = await User.create({
            name,
            email,
            password,
            role: isAdmin ? 'admin' : 'user'
        });

        res.status(201).json({
            message: isAdmin ? 'Admin registered successfully.' : 'User registered successfully.',
            userId: newUser.id
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
