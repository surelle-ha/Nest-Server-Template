require('dotenv').config();
const fs = require('fs');

const commonConfig = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: process.env.DATABASE_TYPE,
  dialectOptions:
    process.env.DATABASE_SSL === 'true'
      ? {
          application_name: `${process.env.APP_NAME}_SEEDER`,
          keepAlive: true,
          ssl: {
            rejectUnauthorized: false
          },
        }
      : {
          application_name: `${process.env.APP_NAME}_SEEDER`,
          keepAlive: true,
        },
};

module.exports = {
  development: { ...commonConfig },
  test: { ...commonConfig },
  production: { ...commonConfig },
};
