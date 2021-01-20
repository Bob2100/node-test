const express = require('express');
const app = express();
app.get('/', (request, response) => {
  response.end('hello server');
});
app.listen(3000);