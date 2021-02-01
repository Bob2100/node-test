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
    const { page, count } = request.query;
    const fruitCol = monogodb.col('fruits');

    const fruits = await fruitCol
      .find()
      .skip((page - 1) * count)
      .limit(Number(count))
      .toArray();

    const totalCount = await fruitCol.find().count();
    response.end(JSON.stringify({
      code: 0,
      result: {
        totalCount,
        fruits
      }
    }));

  } catch (error) {
    console.log(error);
    response.end(JSON.stringify({
      code: -1,
      message: error.message
    }));
  }
});

app.listen(3000);