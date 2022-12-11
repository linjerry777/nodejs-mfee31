const util = require('util');
const fs = require('fs');
const axios = require('axios');

// fs.readFile('test.txt', 'utf-8', (err, data) => {});
// new Promise(...)

let readFilePromise = util.promisify(fs.readFile);
readFilePromise('stock.txt', 'utf-8')
  .then((data) => {
    console.log(data);
    (async () => {
        try {
          let stockNo = data;
          let date = '20221111';
          let response = await axios.get(`http://54.71.133.152:3000/stocks`, {
            params: {
              stockNo,
              date,
            },
          });
      
          console.log('await', response.data);
        } catch (e) {
          console.error(e);
        }
      })();

  })
  .catch();

  
  
