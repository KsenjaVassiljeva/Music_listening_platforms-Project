const db = require('../config/database.js');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const User = require('./user'); // Import the User model

const Playlists = db.define('playlists', {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    userId: {
        type: DataTypes.BIGINT, // Ensure this matches the type in the User model
        allowNull: false,
        references: {
            model: User, // Reference the User model directly
            key: 'id'
        }
    }
}, {
    tableName: 'playlists',
    timestamps: true,
    hooks: {
        beforeCreate: async (playlist) => {
            if (playlist.name) {
                // Hash the playlist name
                playlist.name = await bcrypt.hash(playlist.name, 10);
            }
        },
        beforeUpdate: async (playlist) => {
            if (playlist.name) {
                // Hash the updated playlist name
                playlist.name = await bcrypt.hash(playlist.name, 10);
            }
        }
    }
});

module.exports = Playlists;
