// In user.js
const db = require('../config/database.js');
const { DataTypes } = require('sequelize');

const User = db.define('users', {
    id: {
        type: DataTypes.BIGINT, // Ensure this matches the userId type in playlists
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
}, {
    tableName: 'users',
    timestamps: true,
});

module.exports = User;
