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
      'track',
      [
        {
          id: 'f07ac593-61ab-4bd9-a166-936482eb3a7f',
          name: 'Track 1',
          artistId: 'dc583636-9784-40bb-9d75-976f56bc2167',
          albumId: '2038a9af-6330-4bc5-80ae-b5eb04004541',
          duration: 60000, // ms
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: '5c758929-f3f7-4cb3-9bba-2f08d1b3ad53',
          name: 'Track 2',
          artistId: '07ebf7cc-e9c5-4f40-95cc-79ea0b7adb29',
          albumId: '7809c4e6-6620-4651-a1be-7cf48c16fb99',
          duration: 70000, // ms
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: 'b46f8a5f-9835-467b-892d-8d9b2dda95f6',
          name: 'Track 3',
          artistId: null,
          albumId: '514ef9ac-e77e-4321-a71a-a6bb672b6789',
          duration: 120000, // ms
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: 'cf65a8e0-1c41-4159-a05b-fdc31b7589df',
          name: 'Track 4',
          artistId: null,
          albumId: null,
          duration: 190000, // ms
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
    await queryInterface.bulkDelete('track', null, {});
  },
};
