const db = require('../config/database.js');
const { DataTypes } = require('sequelize');
const User = require('./user.js');
const Tracks = require('./tracks.js');

const UserInteractions = db.define('userInteractions', {
    userId: {
        type: DataTypes.BIGINT, // Ensure this matches the type in the User model
        allowNull: false,
        references: {
            model: User, // Reference the User model directly
            key: 'id'
        }
    },
    tracksId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tracks, // Reference the Tracks model directly
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
            // Check if you really need to hash tracksId
            if (interaction.tracksId) {
                interaction.tracksId = await bcrypt.hash(interaction.tracksId.toString(), 10);
            }
        },
        beforeUpdate: async (interaction) => {
            // Check if you really need to hash tracksId
            if (interaction.tracksId) {
                interaction.tracksId = await bcrypt.hash(interaction.tracksId.toString(), 10);
            }
        }
    }
});

module.exports = UserInteractions;
