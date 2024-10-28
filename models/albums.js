const db = require('../config/database.js');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

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
        type: DataTypes.INTEGER,
        allowNull: false,
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
        type: DataTypes.DATE,  // Changed from TIMESTAMP to DATE
        allowNull: false,
        defaultValue: DataTypes.NOW, // Set default value to now
    },
}, {
    tableName: 'Albums',
    timestamps: false,
    hooks: {
        beforeCreate: async (album) => {
            // Хеширование названия альбома
            const salt = await bcrypt.genSalt(10);
            album.title = await bcrypt.hash(album.title, salt);
        },
        beforeUpdate: async (album) => {
            // Хеширование названия альбома, если оно было изменено
            if (album.changed('title')) {
                const salt = await bcrypt.genSalt(10);
                album.title = await bcrypt.hash(album.title, salt);
            }
        }
    }
});

module.exports = Albums;
