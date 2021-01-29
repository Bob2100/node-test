const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbname = 'test';
(async function () {
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    console.log('连接成功');

    const db = client.db(dbname);

    const fruitsColl = db.collection('fruits');

    let r = await fruitsColl.insertOne({ name: '芒果', price: 20.0 });
    console.log('插入成功', r.result);

    r = await fruitsColl.findOne();
    console.log('查询结果', r);

    r = await fruitsColl.updateOne({ name: '芒果' }, { $set: { name: '苹果' } });
    console.log('更新成功', r.result);

    r = await fruitsColl.deleteOne({ name: '苹果' });
    console.log('删除成功', r.result);
  } catch (error) {

  }
})()