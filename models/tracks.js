const db = require('../config/database.js');
const { DataTypes } = require('sequelize');

const Tracks = db.define('tracks', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    albumId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'albums', // Ensure this matches the exact name in the database
            key: 'id'
        }
    },
    genreId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'genres', // Ensure this matches the exact name in the database
            key: 'id'
        }
    },
    duration: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    filePath: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'tracks',
    timestamps: true,
});

// Export the model
module.exports = Tracks;

