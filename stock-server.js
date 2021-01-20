const http = require('http');
const fs = require('fs');
const originRequest = require('request');


http.createServer((request, response) => {
  const { method, url } = request;
  if (method == 'GET' && url == '/') {
    fs.readFile('./searchStock.html', (err, data) => {
      response.setHeader('Content-Type', 'text/html');
      response.end(data);
    });
  } else if (method == 'GET' && url.indexOf('/s/') == 0) {
    response.setHeader('Content-Type', 'application/json');

    const sendUrl = `http://f10.eastmoney.com/NewFinanceAnalysis/MainTargetAjax?type=1&code=${url.substring(3)}`;
    sendRequest(sendUrl, (err, res, body) => {
      response.end(body.toString());
    });
  }
}).listen(3000);


function sendRequest(url, callback) {
  const options = {
    url: url,
    encoding: null
  }
  originRequest(url, options, callback);
}
