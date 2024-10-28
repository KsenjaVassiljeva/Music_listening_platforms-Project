const db = require('../config/database.js');
const { DataTypes } = require('sequelize');
// No need to import bcrypt for file path
const Albums = require('./albums'); // Import the Albums model
const Genres = require('./genres');   // Import the Genres model

const Tracks = db.define('tracks', {
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    albumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Albums, // Use the Albums model
            key: 'id'
        }
    },
    genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Genres, // Use the Genres model
            key: 'id'
        }
    },
    duration: {
        type: DataTypes.INTEGER, // Duration can be in seconds
        allowNull: false
    },
    filePath: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'tracks',
    timestamps: true,
    // Removed the hashing hooks for filePath
});

module.exports = Tracks;
