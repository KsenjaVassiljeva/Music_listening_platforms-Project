const db = require('../config/database.js');
const { DataTypes, Sequelize } = require('sequelize');
const User = require('./user.js');
const Tracks = require('./tracks.js');

const UserInteractions = db.define('userInteractions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: Sequelize.BIGINT.UNSIGNED, // Adjusting to match the referenced id
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    tracksId: {
        type: Sequelize.BIGINT.UNSIGNED, // Adjusting to match the referenced id
        allowNull: false,
        references: {
            model: 'tracks',
            key: 'id'
        }
    },
    favorited: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    playedAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    tableName: 'user_interactions',
    timestamps: true
});

module.exports = UserInteractions;
