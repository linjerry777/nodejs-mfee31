const doWork = function (job, timer) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let now = new Date();
        resolve(`完成工作 ${job} at ${now.toISOString()}`);
      }, timer);
    });
  };
  
  (async () => {
    let now = new Date();
    console.log(`工作開始 at ${now.toISOString()}`);
    // 刷牙 3 秒鐘 -> 吃早餐 5 秒鐘 -> 寫功課 3 秒鐘
    try {
      let result = await doWork('刷牙', 3000);
      console.log(result);
      result = await doWork('吃早餐', 5000);
      console.log(result);
      result = await doWork('寫功課', 3000);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  })();
  