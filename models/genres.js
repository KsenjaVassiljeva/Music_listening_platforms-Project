const db = require('../config/database.js');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const Genres = db.define('genres', {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'genres',
    timestamps: false,
    hooks: {
        beforeCreate: async (genre) => {
            if (genre.name) {
                genre.name = await bcrypt.hash(genre.name, 10);
            }
        },
        beforeUpdate: async (genre) => {
            // Hash the name before updating the record
            if (genre.name) {
                genre.name = await bcrypt.hash(genre.name, 10);
            }
        }
    }
});

module.exports = Genres;
