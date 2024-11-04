app.post('/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Проверка, существует ли пользователь с указанным email
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email.' });
        }

        // Создание нового пользователя
        const newUser = await User.create({ name, email, password });

        // Ответ об успешной регистрации
        res.status(201).json({ message: 'User registered successfully.', userId: newUser.id });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
});
