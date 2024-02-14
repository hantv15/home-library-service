'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('favorites', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },

      artists: {
        allowNull: true,
        type: Sequelize.JSON,
      },

      albums: {
        allowNull: true,
        type: Sequelize.JSON,
      },

      tracks: {
        allowNull: true,
        type: Sequelize.JSON,
      },

      createdAt: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: () => Date.now(),
      },

      updatedAt: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: () => Date.now(),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('favorites');
  },
};
