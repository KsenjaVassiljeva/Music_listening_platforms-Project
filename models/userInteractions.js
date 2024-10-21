const db = require('../config/database.js');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const UserInteractions = db.define('userInteractions', {
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    trackId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tracks',
            key: 'id'
        }
    },
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
    timestamps: true,
    hooks: {
        beforeCreate: async (interaction) => {
            if (interaction.trackId) {
                interaction.trackId = await bcrypt.hash(interaction.trackId.toString(), 10);
            }
        },
        beforeUpdate: async (interaction) => {
            if (interaction.trackId) {
                interaction.trackId = await bcrypt.hash(interaction.trackId.toString(), 10);
            }
        }
    }
});

module.exports = UserInteractions;
