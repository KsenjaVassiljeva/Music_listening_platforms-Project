const db = require('../config/database.js');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const User = db.define('user', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
}, {
    tableName: 'users',
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
});

// Instance method to verify password
User.prototype.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Optional: Add a class method to find user by email
User.findByEmail = async function(email) {
    return await User.findOne({ where: { email } });
};

module.exports = User;
