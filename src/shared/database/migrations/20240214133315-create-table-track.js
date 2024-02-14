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
    await queryInterface.createTable('track', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },

      artistId: {
        allowNull: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },

      albumId: {
        allowNull: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
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

    await queryInterface.dropTable('track');
  },
};
