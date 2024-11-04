const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();
const session = require('express-session');

// Настройка сессий
router.use(session({
    secret: 'your_secret_key', // Замените на свой секретный ключ
    resave: false,
    saveUninitialized: true,
}));

// Регистрация пользователя
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await User.create({ name, email, password });
        res.status(201).json({ message: 'Пользователь зарегистрирован!', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка регистрации' });
    }
});

// Вход пользователя
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user || !(await user.verifyPassword(password))) {
            return res.status(401).json({ message: 'Неверные учетные данные' });
        }
        req.session.userId = user.id; // Сохраните идентификатор пользователя в сессии
        res.status(200).json({ message: 'Вход выполнен успешно', user });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка входа' });
    }
});

// Выход пользователя
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Ошибка выхода' });
        }
        res.status(200).json({ message: 'Вы вышли из системы' });
    });
});

module.exports = router;
