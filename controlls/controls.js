const Albums = require('../models/albums');
const Genres = require('../models/genres');
const User = require('../models/user');
const Artist = require('../models/artist');
const Playlists = require('../models/playlists');
const sequelize = require('../config/database');
const Tracks = require('../models/tracks');

// Define the join table for Playlist and Track
const PlaylistTracks = sequelize.define('PlaylistTracks', {}, { timestamps: false });

// Define the many-to-many relationship
Playlists.belongsToMany(Tracks, { through: PlaylistTracks, as: 'tracks' });
Tracks.belongsToMany(Playlists, { through: PlaylistTracks, as: 'playlists' }); // Optional: Define the reverse relationship

// Export the models
module.exports = {
    Playlists,
    Tracks,
    PlaylistTracks // Export PlaylistTracks if needed elsewhere
};
