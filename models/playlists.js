const db = require('../config/database.js');
const { DataTypes } = require('sequelize');
const User = require('./user'); // Import the User model

const Playlist = db.define('Playlist', {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: [1, 255], // Ensure the name is not empty and does not exceed 255 characters
        }
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
    // No need for hooks to hash the playlist name
});

// Export the model
module.exports = Playlist;
