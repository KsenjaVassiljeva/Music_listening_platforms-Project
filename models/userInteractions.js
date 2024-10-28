const db = require('../config/database.js');
const { DataTypes } = require('sequelize');

const UserInteractions = db.define('userInteractions', {
    favorited: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    playedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'user_interactions',
    timestamps: true
});

module.exports = UserInteractions;
