const db = require('./database.js');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Artists = require('../models/artist');
const Albums = require('../models/albums');
const Genres = require('../models/genres');
const Playlists = require('../models/playlists');
const Tracks = require('../models/tracks');
const UserInteractions = require('../models/userInteractions');

// Import Sequelize for associations
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// Define associations
// User and UserInteractions
User.hasMany(UserInteractions, { foreignKey: 'userId', as: 'interactions' });
UserInteractions.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Tracks and UserInteractions
Tracks.hasMany(UserInteractions, { foreignKey: 'trackId', as: 'interactions' });
UserInteractions.belongsTo(Tracks, { foreignKey: 'trackId', as: 'track' });

// Playlists and Tracks
const PlaylistTrack = sequelize.define('PlaylistTrack', {}, { timestamps: false });
Playlists.belongsToMany(Tracks, { through: PlaylistTrack, as: 'tracks' });
Tracks.belongsToMany(Playlists, { through: PlaylistTrack, as: 'playlists' });

// Albums and Tracks
Albums.hasMany(Tracks, { foreignKey: 'albumId', as: 'tracks' });
Tracks.belongsTo(Albums, { foreignKey: 'albumId', as: 'album' });

// Artist and Albums
Artists.hasMany(Albums, { foreignKey: 'artistId', as: 'albums' });
Albums.belongsTo(Artists, { foreignKey: 'artistId', as: 'artist' });

// Genres and Tracks
Genres.hasMany(Tracks, { foreignKey: 'genreId', as: 'tracks' });
Tracks.belongsTo(Genres, { foreignKey: 'genreId', as: 'genre' });

// Synchronize the database
async function syncDatabase() {
    try {
        await db.sync({ force: true });
        console.log('Database synchronized successfully!');

        // Create an admin user
        const adminEmail = 'admin@example.com'; // Change to desired admin email
        const adminPassword = '11112'; // Change to desired admin password
        const adminName = 'Admin Name'; // Change to desired admin name

        const existingAdmin = await User.findOne({ where: { email: adminEmail } });

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10); // Hash the password
            const adminUser = await User.create({
                name: adminName,
                email: adminEmail,
                password: hashedPassword,
                role: 'admin', // Specify the role for the admin
            });
            console.log('Admin user created successfully:', adminUser);
        } else {
            console.log('Admin user already exists.');
        }
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
}

// Call the syncDatabase function
syncDatabase();
