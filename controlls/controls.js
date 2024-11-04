const Albums = require('../models/albums');
const Genres = require('../models/genres');
const User = require('../models/user'); 
const Artist = require('../models/artist'); 
const Playlists = require('../models/playlists');
const sequelize = require('../config/database');
const Tracks = require('../models/tracks');
const UserInteractions = require('../models/userInteractions');


const PlaylistTrack = sequelize.define('PlaylistTrack', {}, { timestamps: false });


Playlists.belongsToMany(Tracks, { through: PlaylistTrack, as: 'tracks' });
Tracks.belongsToMany(Playlists, { through: PlaylistTrack, as: 'playlists' });


User.hasMany(UserInteractions, { foreignKey: 'userId', as: 'interactions' });
UserInteractions.belongsTo(User, { foreignKey: 'userId', as: 'user' });


Tracks.hasMany(UserInteractions, { foreignKey: 'trackId', as: 'interactions' });
UserInteractions.belongsTo(Tracks, { foreignKey: 'trackId', as: 'track' });


module.exports = {
    Albums,
    Genres,
    User,
    Artist,
    Playlists,
    Tracks,
    PlaylistTrack,
    UserInteractions
};
