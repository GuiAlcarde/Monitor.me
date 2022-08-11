const dotenv = require('dotenv');
dotenv.config()

module.exports={
    dialect: 'mssql',
    host: process.env.HOST,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    define: {
        timestamps: true,
    },
    xuse_env_variable: 'DATABASE_URL',
    dialectOptions: {
        options: {
          encrypt: true
        }
    },
}