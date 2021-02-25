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
    name: {
      type: Sequelize.STRING(20),
      get() {
        const name = this.getDataValue('name');
        const price = this.getDataValue('price');
        return `${name}(价格:${price})`;
      }
    },
    price: { type: Sequelize.FLOAT, allowNUull: false },
    stock: { type: Sequelize.INTEGER, defaultValue: 0 }
  },
  {
    timestamps: false,
    freezeTableName: true,
    getterMethods: {
      amount() {
        return this.getDataValue('stock') + 'kg';
      }
    },
    setterMethods: {
      amount(val) {
        const index = val.indexOf('kg');
        const stock = val.slice(0, index);
        this.setDataValue('stock', stock);
      }
    }
  });

//sync.
Fruit.sync({ force: true }).then(() => {
  return Fruit.create({ name: '香蕉', price: 3.5 });
}).then(() => {
  Fruit.findAll().then(fruits => {
    console.log(JSON.stringify(fruits));
    console.log(fruits[0].amount);

    //update
    const fruit = fruits[0];
    fruit.amount = '150kg';
    fruit.save().then(() => {
      //query after update
      Fruit.findAll().then(fruits => {
        console.log(JSON.stringify(fruits));
      });
    });

  });
});