const http=require('http');
const app=require('./app');
const server=http.createServer(app);
console.log('hemant')
server.listen(3000,console.log("<--------SERVER IS RUNNING----------->"));