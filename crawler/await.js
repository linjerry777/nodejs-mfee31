const axios = require('axios');
const cheerio = require('cheerio');
const url = 'http://54.71.133.152:3000/stocks?stockNo=2618&date=202211';

  const getTitle = async () => {
    try {
      const response = await axios.get(url);
      const html = response.data;
     
      console.log(html);
    } catch (error) {
      console.error(error);
    }
  }
  getTitle();