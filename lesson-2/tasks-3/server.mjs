// // Задача 2. Користувач через роут ‘/save_num/число’ може передати на сервер якесь число.
// // Ці числа поступово треба зберігати у текстовому файлі numbers.txt.
// // Наприклад, використовуючи такий роут:
// // http://localhost:3000/save_num/78  -  у файл треба додати число 78.

import { createServer } from "node:http";
import handleOperation from "./utils/selectOperation.mjs";

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const parts = url.pathname.split("/");

  try {
    const type = parts[1];

    if (!type) {
      res.writeHead(400);
      res.end("Operation missing");
      return;
    }

    const result = String(
      handleOperation(type, Number(parts[2]), Number(parts[3])),
    );

    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
    });

    res.end(result);
  } catch (error) {
    res.writeHead(400, {
      "Content-Type": "text/plain; charset=utf-8",
    });

    res.end(error.message);
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
