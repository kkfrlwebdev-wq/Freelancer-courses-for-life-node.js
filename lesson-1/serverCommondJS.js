// server.mjs
const { createServer } = require("node:http");
const {showNames} = require("./module/role");


const server =  createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
  const sliceRouts = req.url.slice(1);
  if (req.url ==='/director' || req.url === '/driver'|| req.url === '/manager') { 
    res.end(showNames(sliceRouts));}
 
  else res.end('невідома і"мя!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {



  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`