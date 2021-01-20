const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
  const { method, url } = request;
  if (method == 'GET' && url == '/') {
    fs.readFile('./index.html', (err, data) => {
      response.setHeader('Content-Type', 'text/html');
      response.end(data);
    });
  } else if ((method == 'GET' || method == 'POST') && url == '/users') {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    response.end(JSON.stringify([{ name: 'Tom', age: 20 }]));
  } else if (method == 'OPTIONS' && url == '/users') {
    response.writeHead(200, {
      "Access-Control-Allow-Origin": "http://localhost:3001",
      "Access-Control-Allow-Headers": "X-Token,Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,PUT",
    });
    response.end();
  }
}).listen(3000);