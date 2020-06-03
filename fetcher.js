const args = process.argv.slice(2);
const fs = require('fs');
const request = require('request');

const URL = args[0];
const filePath = args[1];

fs.access(filePath, fs.F_OK, (err) => {
  if (err) {
    console.error(err)
    return
  }
  request(URL, (error, response, body) => {
    if (error !== null || response.statusCode !== 200){
      console.log('error:', error);
      return;
    }
    fs.writeFile(filePath, body, (err) => {
      if (err) throw err;
      console.log(`Downloaded and saved ${fs.statSync(filePath).size} bytes to ${filePath}`);
    });
  });
})
