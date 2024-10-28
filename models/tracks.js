const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js'); // Adjust this path if necessary

const Tracks = sequelize.define('tracks', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    albumId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'albums', // Ensure the table name matches
            key: 'id',
        },
    },
    genreId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'genres', // Ensure the table name matches
            key: 'id',
        },
    },
    duration: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    filePath: {
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
    tableName: 'tracks',
});

module.exports = Tracks;
