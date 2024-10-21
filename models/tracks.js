const db = require('../config/database.js');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const Tracks = db.define('tracks', {
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    albumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'albums',
            key: 'id'
        }
    },
    genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'genres',
            key: 'id'
        }
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    filePath: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'tracks',
    timestamps: true,
    hooks: {
        beforeCreate: async (track) => {
            if (track.filePath) {
                track.filePath = await bcrypt.hash(track.filePath, 10);
            }
        },
        beforeUpdate: async (track) => {
            if (track.filePath) {
                track.filePath = await bcrypt.hash(track.filePath, 10);
            }
        }
    }
});

module.exports = Tracks;
