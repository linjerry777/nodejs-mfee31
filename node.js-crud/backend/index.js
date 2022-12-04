import express from 'express';
import mysql2 from 'mysql2';
import cors from 'cors';
const app = express();

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "0000",
    database: "test"
})

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.json('hello this backend')
})

app.get('/books', (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    }
    )
})

app.post('/books', (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`,`price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("書本增加成功")
    })
}
)

app.delete('/books/:id', (req, res) => {
    const bookId= req.params.id;
    const q = "DELETE FROM books WHERE id = ?"
    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("書本刪除成功")
    })
})

app.put('/books/:id', (req, res) => {
    const bookId= req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]
    db.query(q, [...values,bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("書本更新成功")
    })
})

app.listen(8800, () => {
    console.log('有連到ㄇ?');
});