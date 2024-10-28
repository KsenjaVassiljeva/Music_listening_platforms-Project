const db = require('../config/database.js');
const { DataTypes } = require('sequelize');
const Artist = require('./artist');

const Albums = db.define('albums', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    artistId: {
        type: DataTypes.BIGINT.UNSIGNED, // Ensure this matches the type in the Artist model
        allowNull: false,
        references: {
            model: Artist,
            key: 'id'
        }
    },
    releaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    coverImage: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'albums', // Use lowercase for table name
    timestamps: false,
    // Remove hooks if hashing is not needed
});

module.exports = Albums;
