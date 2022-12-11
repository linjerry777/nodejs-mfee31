const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function run() {
  // 发送爬虫请求，获取网页内容
  const response = await axios.get('https://www.booking.com/');

  // 使用cheerio解析网页内容
  const $ = cheerio.load(response.data);

  // 查找所有的图片链接
  const imgUrls = $('img').map((index, element) => $(element).attr('src')).get();

  // 遍历所有图片链接
  for (const imgUrl of imgUrls) {
    // 下载图片
    const response = await axios({
      method: 'get',
      url: imgUrl,
      responseType: 'stream'
    });

    // 创建文件写入流
    const writer = fs.createWriteStream(`${Date.now()}.jpg`);

    // 将图片内容写入文件
    response.data.pipe(writer);

    // 监听写入完成事件
    writer.on('finish', () => {
      console.log(`图片 ${imgUrl} 下载完成`);
    });
  }
}

run();
