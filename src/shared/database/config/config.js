/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'database_dev',
    password: process.env.DB_PASSWORD || 'database_dev',
    database: process.env.DB_DATABASE || 'database_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_TYPE || 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
    migrationStorageTableName: 'sequelize_meta',
    seederStorage: 'json',
    seederStoragePath: 'sequelize_data.json',
  },
  test: {
    username: process.env.DB_USERNAME || 'database_dev',
    password: process.env.DB_PASSWORD || 'database_dev',
    database: process.env.DB_DATABASE || 'database_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_TYPE || 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
    seederStorageTableName: 'SequelizeData',
  },
  production: {
    username: process.env.DB_USERNAME || 'database_dev',
    password: process.env.DB_PASSWORD || 'database_dev',
    database: process.env.DB_DATABASE || 'database_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_TYPE || 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
    seederStorageTableName: 'SequelizeData',
  },
};
