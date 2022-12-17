// install mysql2

// const mysql2 = require('mysql2/promise');
import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config();

(async () => {
  const connection = await mysql2.createConnection({
   /*  host: 'localhost',
    port: 3306,
    user: 'admin',
    password: '12345',
    database: 'stock_mfee31', */
    host: process.env.DB_HOST,
    port: process.env.DB_POST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
  });

  // simple query
  let result = await connection.query('SELECT * FROM `stocks`');
  let data = result[0];
  // console.log(result);
  console.log(data);

  connection.end();
})();