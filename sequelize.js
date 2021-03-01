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
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        isFloat: { msg: '价格字段必须输入数字' },
        min: { args: [0], msg: '价格字段必须大于0' }
      }
    },
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

//模型扩展
Fruit.classify = function (name) {
  const tropicFruits = ['芒果', '榴莲'];
  return tropicFruits.includes(name) ? '热带水果' : '其他水果';
}

// console.log(Fruit.classify('草莓'));

//sync.
async function main() {
  try {
    await Fruit.sync({ force: true });
    await Fruit.create({ name: '香蕉', price: 3.5 });
    await Fruit.create({ name: '苹果', price: 6 });

    //查询操作符
    const Op = Sequelize.Op;
    const result = await Fruit.findAll({
      where: {
        price: {
          [Op.gt]: 5
        }
      }
    });
    console.log(JSON.stringify(result));

    // const fruits = await Fruit.findAll();
    // console.log(JSON.stringify(fruits));
    // console.log(fruits[0].amount);

    // //update
    // const fruit = fruits[0];
    // fruit.amount = '150kg';
    // const result = await fruit.save();
    // console.log(result.get());

    // find by one
    // const result = await Fruit.findOne({ where: { name: '香蕉' } });
    // console.log(JSON.stringify(result));

  } catch (error) {
    console.log(error);
  }
}
main();
