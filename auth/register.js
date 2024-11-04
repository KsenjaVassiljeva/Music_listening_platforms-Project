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
            userId: newUser.id,
            name: newUser.name
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
});