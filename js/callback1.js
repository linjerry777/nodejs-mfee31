let doWork = function (job, timer, cb) {
    let new2timer = 0

    for (let i = 0; i < job.length; i++) {

        let newjob = job[i];
        let newtimer = timer[i];
        new2timer += newtimer;



        setTimeout(() => {
            let now = new Date();
            cb(null, `完成工作 ${newjob} at ${now.toISOString()}`);
        }, new2timer);
    }


};

let now = new Date();
console.log(`工作開始 at ${now.toISOString()}`);
// 刷牙 3 秒鐘 -> 吃早餐 5 秒鐘 -> 寫功課 3 秒鐘
doWork(['刷牙', '早餐', '上班'], [3000, 5000, 3000], (err, data) => {
    console.log(data);

});