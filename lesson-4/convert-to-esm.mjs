import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

const files = {
  "package.json": `{
  "name": "myapp",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node ./bin/www.mjs"
  },
  "dependencies": {
    "cookie-parser": "^1.4.6",
    "debug": "^4.4.0",
    "ejs": "^3.1.10",
    "express": "^5.1.0",
    "http-errors": "^2.0.0",
    "morgan": "^1.10.0"
  }
}
`,

  "app.mjs": `
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { fileURLToPath } from 'url'

import indexRouter from './routes/index.mjs'
import usersRouter from './routes/users.mjs'

const app = express()
const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
export default app


`,

  "bin/www.mjs": `#!/usr/bin/env node

import app from '../app.mjs'
import debugLib from 'debug'
import http from 'http'

const debug = debugLib('my-express-app:server')

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const server = http.createServer(app)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}



`,

  "routes/index.mjs": `
import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
})

export default router


`,

  "routes/users.mjs": `
import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
  res.send('respond with a resource')
})

export default router

`,
};

async function createFile(file, content) {
  const filePath = path.join(root, file);

  const dir = path.dirname(filePath);

  await fs.mkdir(dir, {
    recursive: true,
  });

  await fs.writeFile(filePath, content.trim());

  console.log("✔", file);
}

async function main() {
  console.log("\n🚀 Створення Express ES6 Modules проєкту\n");

  for (const [file, content] of Object.entries(files)) {
    await createFile(file, content);
  }

  console.log("\n✅ Готово!");

  console.log("\nДалі виконай:");

  console.log("npm install");

  console.log("npm start");
}

main();
