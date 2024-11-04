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
