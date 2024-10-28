const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Путь к вашему файлу конфигурации базы данных

class UserInteraction extends Model {}

UserInteraction.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  track_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  played_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'UserInteraction',
  tableName: 'user_interactions', // Убедитесь, что это соответствует вашему имени таблицы в базе данных
  timestamps: true, // Если вам нужны поля createdAt и updatedAt
});

module.exports = UserInteraction;
