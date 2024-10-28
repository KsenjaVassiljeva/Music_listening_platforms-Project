const db = require('./database.js');

const User = require('../models/user');
const Artists = require('../models/artist');
const Albums = require('../models/albums');
const Genres = require('../models/genres');
const Playlists = require('../models/playlists');
const Tracks = require('../models/tracks');
const UserInteractions = require('../models/userInteractions');
const PlaylistTracks = require('../controlls/controls.js');

// Синхронизация базы данных
async function syncDatabase() {
    try {
        await db.sync({ force: true });
        console.log('Database synchronized successfully!');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
}


syncDatabase();
