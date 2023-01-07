import express from "express";
import mysql2 from "mysql2";
import dotenv from 'dotenv'
import cors from "cors";

dotenv.config()
const app = express();
app.use(cors());

app.use(express.json());
// app.use(express.static('./static'))
/* app.use((req, res, next) => {
  console.log("這是中間件");
  next();
}); */

app.listen(8800, (req, res) => {
  console.log("連到囉~");
});


app.get("/", (req, res) => {
  res.json("hello this is backend");
  console.log("hi");
});
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  //限制pool連線數上限
  connectionLimit:10,
}).promise()
/* const db = mysql2.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  //限制pool連線數上限
  connectionLimit:10,
}); */

/* app.get("/stocks/:stock_id", async (req, res) => {
  const stock_id = req.params.stock_id
  const q = "SELECT * FROM stock_prices WHERE stock_id = ?";
  let [data] = await pool.query(q,[stock_id]);
  res.json(data);
}); */





/* app.delete('/books/:id', (req, res) => {
  const bookId= req.params.id;
  const q = "DELETE FROM books WHERE id = ?"
  db.query(q, [bookId], (err, data) => {
      if (err) return res.json(err)
      return res.json("書本刪除成功")
  })
}) */



app.get("/api/stocks", async (req, res) => {
  const q = "SELECT * FROM stocks";
  let [data] = await pool.query(q);
  res.json(data);
});


app.post('/stocks', (req, res) => {
  const q = "INSERT ignore INTO stocks (`id`, `name`) VALUES (?)"
  const values = [
      req.body.id,
      req.body.name,
  ]

  pool.query(q, [values], (err, data) => {
      if (err) return res.json(err)
      return res.json("stock增加成功")
  })
}
)





app.post("/stocks", (req, res) => {
  const q =
    "INSERT INTO stock_prices (`stock_id`,`date`,`open_price`,`high_price`,`low_price`,`close_price`,`delta_price`,`transactions`,`volume`,`amount`) VALUES (?)";
  const values = [
    req.body.stock_id,
    req.body.date,
    req.body.open_price,
    req.body.high_price,
    req.body.low_price,
    req.body.close_price,
    req.body.delta_price,
    req.body.transactions,
    req.body.volume,
    req.body.amount,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("股票增加成功");
  });
});
app.delete('/stocks/:id', (req, res,next) => {
    const id = req.params.id;
    const q = "DELETE FROM stocks WHERE id = ?"
    pool.query(q, [id], (err, data) => {
        if (err) return res.json(err)
        return res.json("股票刪除成功")
    })
})

app.get('/api/stocks/:stockId', async (req, res, next) => {
  console.log('/api/stocks/:stockId => ', req.params.stockId);

  // 分頁

  // 從前端拿到目前是要第幾頁
  // 通常會放在 query string -> req.query.page
  // /api/stocks/:stockId?page=2
  // /api/stocks/:stockId -> 如果 page 沒有寫，預設使用者是要第一頁
  // 如果沒有 page 這個 query string 就預設為 1
  const page = req.query.page || 1;

  // 總筆數？
  let [results] = await pool.execute('SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=?', [req.params.stockId]);
  // console.log('GET /stocks/details -> count:', results[0].total);
  const total = results[0].total;

  // 總共有幾頁
  const perPage = 5; // 一頁有五筆
  const totalPage = Math.ceil(total / perPage);

  // 計算 offset, limit (一頁有幾筆)
  const limit = perPage;
  const offset = perPage * (page - 1);

  // 根據 offset, limit 去取得資料
  let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id=? ORDER BY date LIMIT ? OFFSET ?', [req.params.stockId, limit, offset]);
  // 把資料回覆給前端
  res.json({
    pagination: {
      total,
      perPage,
      totalPage,
      page,
    },
    data,
  });

  // 會用 prepared statement 的方式來避免發生 sql injection
  // pool.query vs pool.execute
  // let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id=?', [req.params.stockId]);
  // res.json(data);
});