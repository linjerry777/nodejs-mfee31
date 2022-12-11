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
        // console.error();
        reject("發生錯誤了", err);
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

/* async function read() {
  try {
    console.log(await p("test.txt"));

    if(data='hello'){ console.log(await p("test1.txt"));}else{}

    console.log(await p("test1.txt"));
    console.log(await p("test2.txt"));
    console.log(await p("test3.txt"));

  } catch (err) {
    console.error(err);
  }
}
read(); */


//Promise.all 都完成才傳回promise物件
//Promise.race 回傳最先完成的
(async () => {
  
  let p1 = p("test1.txt")
  let p2 = p("test2.txt")
  let p3 = p("test.txt")
    let a = await Promise.all([p1,p2,p3])
    let b = await Promise.race([p1,p2,p3])
    console.log(a,b)
  
})();
