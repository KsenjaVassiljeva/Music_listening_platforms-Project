const db = require('../config/database.js');
const { DataTypes } = require('sequelize');

const Genre = db.define('Genre', {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: [1, 255], // Ensure the name is not empty and does not exceed 255 characters
        }
    }
}, {
    tableName: 'genres',
    timestamps: false, // No timestamps needed for this model
});

// Export the model
module.exports = Genre;
