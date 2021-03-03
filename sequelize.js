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
// Fruit.classify = function (name) {
//   const tropicFruits = ['芒果', '榴莲'];
//   return tropicFruits.includes(name) ? '热带水果' : '其他水果';
// }

// console.log(Fruit.classify('草莓'));

//sync.
async function fruitMain() {
  try {
    await Fruit.sync({ force: true });
    await Fruit.create({ name: '香蕉', price: 3.5 });
    await Fruit.create({ name: '苹果', price: 6 });

    // const result = await Fruit.max('price');
    // const result = await Fruit.sum('price');
    // console.log(JSON.stringify(result));

    //更新
    // const result = await Fruit.update({ price: 5 }, { where: { id: 1 } });
    // console.log(result);

    //删除
    const result = await Fruit.destroy({ where: { id: 1 } });
    console.log(result);

    //查询操作符
    // const Op = Sequelize.Op;
    // const result = await Fruit.findAll({
    //   where: {
    //     price: {
    //       [Op.gt]: 5
    //     }
    //   }
    // });
    // console.log(JSON.stringify(result));

    const fruits = await Fruit.findAll();
    console.log(JSON.stringify(fruits));
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

// const Player = sequelize.define('player', { name: Sequelize.STRING });
// const Team = sequelize.define('team', { name: Sequelize.STRING });
// Player.belongsTo(Team);
// Team.hasMany(Player);

async function sequelizeOneToMany() {
  await sequelize.sync({ force: true });
  await Team.create({ name: '火箭' });
  await Player.bulkCreate([{ name: '哈登', teamId: 1 }, { name: '保罗', teamId: 1 }]);

  //1 端关联查询
  // const players = await Player.findAll({ include: [Team] });
  // console.log(JSON.stringify(players, null, 2));

  //n 端关联查询
  const team = await Team.findOne({ where: { name: '火箭' }, include: [Player] });
  console.log(JSON.stringify(team, null, 2));

}

// sequelizeOneToMany();
const Category = sequelize.define('category', { name: Sequelize.STRING });
Fruit.FruitCategory = Fruit.belongsToMany(Category, {
  through: 'FruitCategory'
});
async function sequelizeManyToMany() {
  await sequelize.sync({ force: true });
  await Fruit.create({
    name: '香蕉',
    price: 10,
    categories: [{ id: 1, name: '热带' }, { id: 2, name: '温带' }]
  }, {
    include: [Fruit.FruitCategory]
  });

  //多对多联合查询
  const fruit = await Fruit.findOne({
    where: { name: '香蕉' },
    include: [
      {
        model: Category,
      }
    ]
  });
  console.log(JSON.stringify(fruit, null, 2));
}
sequelizeManyToMany();
