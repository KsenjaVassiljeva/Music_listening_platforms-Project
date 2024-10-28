const db = require('../config/database.js');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const Artist = db.define('artist', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true, // Ensures that the artist name is unique
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [10, 1000], // Example: bio must be between 10 and 1000 characters
        },
    },
    password: { // Field for storing hashed password
        type: DataTypes.STRING(255),
        allowNull: false,
    }
}, {
    tableName: 'Artist',
    timestamps: true, // Enable timestamps
    hooks: {
        beforeCreate: async (artist) => {
            const salt = await bcrypt.genSalt(10);
            artist.password = await bcrypt.hash(artist.password, salt);
        },
        beforeUpdate: async (artist) => {
            if (artist.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                artist.password = await bcrypt.hash(artist.password, salt);
            }
        }
    }
});

module.exports = Artist;
