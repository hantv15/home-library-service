'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'artist',
      [
        {
          id: 'dc583636-9784-40bb-9d75-976f56bc2167',
          name: 'John Doe',
          grammy: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: '07ebf7cc-e9c5-4f40-95cc-79ea0b7adb29',
          name: 'DeDe',
          grammy: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: '95bcab13-3439-4ec6-9867-fb1866bb0faf',
          name: 'Max Rider',
          grammy: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('artist', null, {});
  },
};
