const db = require('../config/database.js');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const PlaylistTracks = db.define('playlistTracks', {
    playlistId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'playlists',
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
    }
}, {
    tableName: 'playlist_tracks',
    timestamps: false,
    hooks: {
        beforeCreate: async (playlistTrack) => {
            if (playlistTrack.trackId) {
                const hashedId = await bcrypt.hash(playlistTrack.trackId.toString(), 10);
                playlistTrack.trackId = hashedId; // This will not match the original trackId in the database
            }
        },
        beforeUpdate: async (playlistTrack) => {
            if (playlistTrack.trackId) {
                const hashedId = await bcrypt.hash(playlistTrack.trackId.toString(), 10);
                playlistTrack.trackId = hashedId; // This will not match the original trackId in the database
            }
        }
    }
});

module.exports = PlaylistTracks;
