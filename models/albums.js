const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js'); // Adjust this path if necessary

const Albums = sequelize.define('albums', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    artistId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
            model: 'Artist', // Ensure the case matches exactly
            key: 'id',
        },
    },
    releaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    coverImage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
}, {
    tableName: 'albums',
});

module.exports = Albums;
