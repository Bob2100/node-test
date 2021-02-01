const conf = require('./conf');
const { MongoClient } = require('mongodb');
const { EventEmitter } = require('events');

class Mongodb {
  constructor(conf) {
    this.conf = conf;
    this.emitter = new EventEmitter();
    this.client = new MongoClient(conf.url, { useUnifiedTopology: true });
    this.client.connect(err => {
      if (err) {
        throw err;
      }
      console.log('连接数据库成功');
      this.emitter.emit('connect');
    });
  }

  once(event, cb) {
    this.emitter.once(event, cb);
  }

  col(colName, dbName = this.conf.dbName) {
    return this.client.db(dbName).collection(colName);
  }
}

module.exports = new Mongodb(conf);