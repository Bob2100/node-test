const Sequelize = require('sequelize');

//connection
const sequelize = new Sequelize('test', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false
});

//model - table
const Fruit = sequelize.define(
  'fruit',
  {
    name: Sequelize.STRING(20),
    price: { type: Sequelize.FLOAT, allowNUull: false },
    stock: { type: Sequelize.INTEGER, defaultValue: 0 }
  },
  {
    timestamps: false
  });

//sync.
Fruit.sync({ force: true }).then(() => {
  return Fruit.create({ name: '香蕉', price: 3.5 });
}).then(() => {
  Fruit.findAll().then(fruits => {
    console.log(JSON.stringify(fruits));
  });
});