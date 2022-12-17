import express from "express";

const app = express();
app.listen(8800,(req,res)=>{
    console.log("連到囉~")
})
app.get("/", (req, res) => {
  res.json("hello this is backend");

});
