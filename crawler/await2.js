const util = require("util");
const fs = require("fs/promises");
const axios = require("axios");
const moment = require("moment");

(async (fileName) => {
  try {
    let stockNo = await fs.readFile(fileName, "utf-8");
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
