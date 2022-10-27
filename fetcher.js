const args = process.argv.slice(2);

let url = args[0];
let path = args[1];

const request = require('request');
request(url, (error, response, body) => {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  if (error || response.statusCode !== 200) {
    console.log('Invalid URL. Please try agian!');
    process.exit();
  }
  const fs = require('fs');
  fs.writeFile(path, body, err => {
    if (err) {
      console.error('Error: no such file or directory exist. -' + path);
      process.exit();
    }
    fs.stat(path, (err, stats) => {
      if (err) {
        console.log(`File doesn't exist.`);
      } else {
        console.log(`Downloaded and saved ${stats.size} bytes to ${path}`);
      }
    });
  });
});