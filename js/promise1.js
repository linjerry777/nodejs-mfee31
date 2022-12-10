// Promise 是一個表示非同步運算的最終完成或失敗的物件。
// 1. Promise 是一個物件 new Promise()
//    new Promise(executor)
//    executor: function(resolve, reject) {}
// 2. 執行非同步工作
// 3. 最終完成或失敗
//    完成 -> 呼叫 resolve
//    失敗 -> 呼叫 reject

let doWorkPromise = function (job, timer) {
    // 1. 物件 -> new
    return new Promise((resolve, reject) => {
      // 2. 執行非同步工作
      setTimeout(() => {
        let now = new Date();
        resolve(`完成工作 ${job} at ${now.toISOString()}`);
      }, timer);
    });
  };
  
  let now = new Date();
  console.log(`工作開始 at ${now.toISOString()}`);
  let brushPromise = doWorkPromise('刷牙', 3000);
  brushPromise
    .then((data) => {
      console.log(data); return doWorkPromise('早餐', 5000)
    })
    .then((data) => {
      console.log(data); return doWorkPromise('上班', 3000)
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error('發生錯誤', err);
    });
/* 
    let brushPromise = doWorkPromise('刷牙', 3000);
    let eat = doWorkPromise('2', 3000);

    let work = doWorkPromise('3', 3000);

    brushPromise
      .then((data) => {
        console.log(data); return eat
      })
      .then((data) => {
        console.log(data); return work
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error('發生錯誤', err);
      }); */