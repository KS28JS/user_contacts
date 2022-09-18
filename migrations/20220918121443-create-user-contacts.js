'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users'
        }
      },
      full_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(50),
        validate: {
          isEmail: true
        }
      },
      phone_number: {
        type: Sequelize.BIGINT,
        defaultValue: null
      },
      createdAt: {
        type: 'TIMESTAMP',
      },
      updatedAt: {
        type: 'TIMESTAMP',

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_contacts');
  }
};