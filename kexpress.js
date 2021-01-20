const url = require("url");
const http = require('http');

let router = [];
class Application {
  get(path, handler) {
    router.push({
      path,
      method: 'get',
      handler
    });
  }
  listen() {
    http.createServer((request, response) => {
      let { pathname } = url.parse(request.url, true);
      for (const route of router) {
        if (route.path == pathname) {
          route.handler(request, response);
          return;
        }
      }
    }).listen(...arguments);
  }
}
module.exports = function (config) {
  return new Application();
}