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
      'album',
      [
        {
          id: '2038a9af-6330-4bc5-80ae-b5eb04004541',
          name: 'Album 1',
          artistId: 'dc583636-9784-40bb-9d75-976f56bc2167',
          year: 2023,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: '7809c4e6-6620-4651-a1be-7cf48c16fb99',
          name: 'Album 2',
          artistId: '07ebf7cc-e9c5-4f40-95cc-79ea0b7adb29',
          year: 2024,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: '514ef9ac-e77e-4321-a71a-a6bb672b6789',
          name: 'Album 3',
          artistId: null,
          year: 2019,
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
    await queryInterface.bulkDelete('album', null, {});
  },
};
