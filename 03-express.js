const express = require('./kexpress');
const app = express();
app.get('/', (request, response) => {
  response.end('hello server123');
});
app.listen(3000);