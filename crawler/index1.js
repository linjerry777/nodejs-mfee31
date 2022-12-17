import { readFile } from "node:fs/promises";
import axios from "axios";
import moment from "moment";
import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());

  const db =  mysql2.createConnection({
    host: "localhost",
    user: "admin",
    password: "12345",
    database: "stock_mfee31",
    port: 3306,
  });

  app.get("/stocks", (req, res) => {
     const q = "SELECT * FROM stocks";
     db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
   
  });
  


app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello~");
});

app.post("/stocks", (req, res) => {
  const q = "INSERT INTO stocks (`id`, `name`) VALUES (?)";
  const values = [req.body.id, req.body.name];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("股票增加成功");
  });
});

app.listen(8800, () => {
  console.log("連到囉88888");
});

/* (async (fileName) => {
  try {

    let stockNo = await readFile(fileName, "utf-8");
    console.log(stockNo)
    let date = moment().format('YYYYMMDD');
    let response = await axios.get(`http://54.71.133.152:3000/stocks`, {
      params: {
        stockNo,
        date,
      },
    });

    console.log("await", response.data);
  } catch (e) {
    console.error("找不到");
  }
})('stock.txt');
 */
