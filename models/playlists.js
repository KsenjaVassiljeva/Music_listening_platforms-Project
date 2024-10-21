const db = require('../config/database.js');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const Playlists = db.define('playlists', {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    tableName: 'playlists',
    timestamps: true,
    hooks: {
        beforeCreate: async (playlist) => {
            if (playlist.name) {
                playlist.name = await bcrypt.hash(playlist.name, 10);
            }
        },
        beforeUpdate: async (playlist) => {
            if (playlist.name) {
                playlist.name = await bcrypt.hash(playlist.name, 10);
            }
        }
    }
});

module.exports = Playlists;
