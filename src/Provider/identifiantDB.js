require('dotenv').config();

export const identifiantDB = {
    username: process.env.DATABASE_ROOT_USERNAME,
    password: process.env.DATABASE_ROOT_PASSWORD,
    host: process.env.DATABASE_HOST,
    database : process.env.DATABASE_NAME,
    port : process.env.DATABASE_PORT
};

