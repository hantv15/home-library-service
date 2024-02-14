/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { randomUUID } = require('crypto');

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
      'favorites',
      [
        {
          id: randomUUID(),
          artists: JSON.stringify([
            'dc583636-9784-40bb-9d75-976f56bc2167',
            '5c758929-f3f7-4cb3-9bba-2f08d1b3ad53',
            '07ebf7cc-e9c5-4f40-95cc-79ea0b7adb29',
          ]),
          albums: JSON.stringify([
            '7809c4e6-6620-4651-a1be-7cf48c16fb99',
            '514ef9ac-e77e-4321-a71a-a6bb672b6789',
            '7809c4e6-6620-4651-a1be-7cf48c16fb99',
          ]),
          tracks: JSON.stringify([
            'f07ac593-61ab-4bd9-a166-936482eb3a7f',
            '5c758929-f3f7-4cb3-9bba-2f08d1b3ad53',
            'b46f8a5f-9835-467b-892d-8d9b2dda95f6',
            'cf65a8e0-1c41-4159-a05b-fdc31b7589df',
          ]),
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
    await queryInterface.bulkDelete('favorites', null, {});
  },
};
