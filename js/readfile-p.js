const fs = require("fs");

// error-first callback
/* fs.readFile("test.txt", "utf-8", (err, data) => {
  if (err) {
    // 如果 err 有值，表示有錯誤發生
    // 這裡應該要處理錯誤
    console.error("發生錯誤了", err);
  } else {
    // 進來這裡，表示 err 是空的 (可能是 null)
    console.log("成功讀到資料:", data);
  }
}); */

const p = function (fileName) {
  //宣告一個function方便調用(fileName用來接收要開的檔案)
  let doreadFile = new Promise((resolve, reject) => {
    //let xx = new Promise((resolve, reject) =>{}) Promise語法糖

    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        // 如果 err 有值，表示有錯誤發生
        // 這裡應該要處理錯誤
        reject("發生錯誤了", err);
        // console.error();
      } else {
        resolve(`成功讀到資料: ${data}`);
        // 進來這裡，表示 err 是空的 (可能是 null)
        // console.log("成功讀到資料:", data);
      }

      //條件判斷 resolve or reject
    });
  });
  //返回promise物件
  return doreadFile;
};

//調用function('filename') data 為resolve裡的值
p('test.txt')
  .then((data) => {
    console.log("收到", data);
    //callback再次調用p function(filename)
   return p('test1.txt')
  })
  .then((data) => {
    console.log("收到", data);
    return p('test2.txt')
  })
  .then((data) => {
    console.log("收到", data)
    return p('test3.txt')

  })
  .catch((err) => {
    console.log("沒收到", err);
  })
  
