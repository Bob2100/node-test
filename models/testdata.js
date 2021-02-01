const mongodb = require('./db');

mongodb.once('connect', async () => {
  const col = mongodb.col('fruits');
  try {
    await col.deleteMany();
    await col.insertMany([
      { name: '苹果', price: 5, category: '水果' },
      { name: '香蕉', price: 5, category: '水果' },
      { name: '橘子', price: 5, category: '水果' },
      { name: '柚子', price: 5, category: '水果' },
      { name: '萝卜', price: 5, category: '蔬菜', stack: 100 },
      { name: '土豆', price: 5, category: '蔬菜', stack: 100 },
      { name: '白菜', price: 5, category: '蔬菜' },
      { name: '黄瓜', price: 5, category: '蔬菜' },
    ]);

    console.log('测试数据插入成功');
  } catch (error) {
    console.log('测试数据插入失败', error);
  }
});