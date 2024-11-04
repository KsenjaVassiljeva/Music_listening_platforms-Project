const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js'); // Adjust this path if necessary

const UserInteractions = sequelize.define('userInteractions', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'users', // Ensure the table name matches
            key: 'id',
        },
    },
    trackId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'tracks', // Ensure the table name matches
            key: 'id',
        },
    },
    favorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    playedAt: {
        type: DataTypes.DATE,
        allowNull: true, // Allow null if the track hasn't been played
    }
}, {
    tableName: 'userInteractions',
    timestamps: true, // This automatically adds createdAt and updatedAt
});

// Export the model
module.exports = UserInteractions;
