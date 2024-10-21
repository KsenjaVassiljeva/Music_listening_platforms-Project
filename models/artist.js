const { DataTypes } = require('sequelize');
const db = require('../config/database');
const bcrypt = require('bcrypt');

const Artist = db.define('artist', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    password: { // Поле для хранения хешированного пароля
        type: DataTypes.STRING(255),
        allowNull: false,
    }
}, {
    tableName: 'Artist',
    timestamps: false,
    hooks: {
        beforeCreate: async (artist) => {
            const salt = await bcrypt.genSalt(10);
            artist.password = await bcrypt.hash(artist.password, salt);
        },
        beforeUpdate: async (artist) => {
            if (artist.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                artist.password = await bcrypt.hash(artist.password, salt);
            }
        }
    }
});

module.exports = Artist;
