// 实现一个文件系统读写数据库
const fs = require('fs');

const operation = {
  get(interface, key, value) {
    fs.readFile('./db.json', (err, data) => {
      const json = JSON.parse(data);
      console.log(json[key]);
    });
  },
  set(interface, key, value) {
    fs.readFile('./db.json', (err, data) => {
      const json = data.toString() == '' ? {} : JSON.parse(data.toString());
      json[key] = value;

      // 重新写入
      fs.writeFile('./db.json', JSON.stringify(json), err => {
        if (err) {
          console.log(err);
        }
        console.log('写入成功！');
      });
    });
  },
  quit(interface, key, value) {
    interface.close();
  }
}

// 命令行接口
const readline = require('readline');
const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

interface.on('line', function (input) {
  const [op, key, value] = input.split(' ');
  operation[op](interface, key, value);
});