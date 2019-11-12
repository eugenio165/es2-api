const dotenv = require('dotenv');
dotenv.config()

export const environment = {
    SECRET_KEY: 'a very complex secret key',
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
};
