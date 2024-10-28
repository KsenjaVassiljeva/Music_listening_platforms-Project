const Albums = require('../models/albums');
const Genres = require('../models/genres');
const User = require('../models/user'); // Keep this if needed elsewhere
const Artist = require('../models/artist'); // Keep this if needed elsewhere
const Playlists = require('../models/playlists');
const sequelize = require('../config/database');
const Tracks = require('../models/tracks');

// Define the join table for Playlist and Track
const PlaylistTrack = sequelize.define('PlaylistTrack', {}, { timestamps: false });

// Define the many-to-many relationship
Playlists.belongsToMany(Tracks, { through: PlaylistTrack, as: 'tracks' });
Tracks.belongsToMany(Playlists, { through: PlaylistTrack, as: 'playlists' }); // Define the reverse relationship

// Export the models in a single object
module.exports = {
    Albums,
    Genres,
    User,
    Artist,
    Playlists,
    Tracks,
    PlaylistTrack // Export PlaylistTrack if needed elsewhere
};
