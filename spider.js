const originRequest = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

function request(url, callback) {
  const options = {
    url: url,
    encoding: null
  }
  originRequest(url, options, callback);
}

const url = 'https://www.dy2018.com/i/103075.html';
request(url, (err, response, body) => {
  const html = iconv.decode(body, "gb2312");
  const $ = cheerio.load(html);
  console.log($('.title_all h1').text());
});
