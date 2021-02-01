const monogodb = require('./models/db');
const testdata = require('./models/testdata');
const path = require('path');
const express = require('express');
const { count } = require('console');
const app = express();

app.get('/fruit-market', (request, response) => {
  response.sendFile(path.resolve('./fruit-market.html'));
});

app.get('/api/list', async (request, response) => {
  try {
    const { page, countsPerPage } = request.query;
    const fruits = await monogodb
      .col('fruits')
      .find()
      .skip((page - 1) * countsPerPage)
      .limit(Number(countsPerPage))
      .toArray();
    response.end(JSON.stringify({ code: 0, result: fruits }, null, 2));

  } catch (error) {
    console.log(error);
    response.end(JSON.stringify({ code: -1, message: error.message }, null, 2));
  }
});

app.listen(3000);