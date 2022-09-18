'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserContacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { foreignKey: 'user_id' })
    }
  }
  UserContacts.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      validate: {
        isEmail: true
      }
    },
    phone_number: {
      type: DataTypes.BIGINT,
      defaultValue: null
    },
    createdAt: {
      type: 'TIMESTAMP',
    },
    updatedAt: {
      type: 'TIMESTAMP',

    }
  }, {
    sequelize,
    modelName: 'UserContacts',
    tableName: 'user_contacts'
  });
  return UserContacts;
};