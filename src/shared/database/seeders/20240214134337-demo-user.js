'use strict';

const { randomUUID } = require('crypto');
const { version } = require('os');

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
      'user',
      [
        {
          id: randomUUID(),
          login: 'user1',
          password:
            '$2a$10$9qMKASKK7WVd7zxAGiTiweUk.JqcckCnB2LlB1WT6BpP7iGwejsrG', // 123456
          version: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: randomUUID(),
          login: 'user2',
          password:
            '$2a$10$9qMKASKK7WVd7zxAGiTiweUk.JqcckCnB2LlB1WT6BpP7iGwejsrG',
          version: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: randomUUID(),
          login: 'user3',
          password:
            '$2a$10$9qMKASKK7WVd7zxAGiTiweUk.JqcckCnB2LlB1WT6BpP7iGwejsrG',
          version: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: randomUUID(),
          login: 'user4',
          password:
            '$2a$10$9qMKASKK7WVd7zxAGiTiweUk.JqcckCnB2LlB1WT6BpP7iGwejsrG',
          version: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: randomUUID(),
          login: 'user5',
          password:
            '$2a$10$9qMKASKK7WVd7zxAGiTiweUk.JqcckCnB2LlB1WT6BpP7iGwejsrG',
          version: 0,
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
    await queryInterface.bulkDelete('user', null, {});
  },
};
