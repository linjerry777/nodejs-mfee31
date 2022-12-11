const axios = require('axios');
const cheerio = require('cheerio');
const url = 'http://54.71.133.152:3000/stocks?stockNo=2618&date=202211';

/* axios.get(url)
  .then(response => {
    const html = response.data;
  
    const $ = cheerio.load(html);
   
    console.log(html)
    const title = $('p').text();
   
    console.log(title)
    
  })
  .catch(console.error); */
 
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