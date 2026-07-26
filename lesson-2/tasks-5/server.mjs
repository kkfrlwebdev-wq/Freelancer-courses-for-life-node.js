// Задача 5. Створити додаток з історією. У файлі json зберігаємо усі роути та кількість відвідувань.
//  У налаштуваннях settings.json зберігати який роут треба використати для перегляду історії та назву файлу де зберігається історія

// server.mjs
import { createServer } from "node:http";
import settings from "./settings.json" with { type: "json" };
import routeHistoryCheck from "./utils/routeHistoryCheck.mjs";

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const route = url.pathname;

  if (route === settings.historyRoute) {
    try {
      const history = await routeHistoryCheck.readFile();

      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
      });
      res.end(JSON.stringify(history));

      console.log("Файл є");
    } catch (error) {
      console.log("Файлу немає");

      res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      res.end("Файл не знайдено");
    }
    return;
  }
  if (route !== "/favicon.ico") {
   
    routeHistoryCheck.writeFile(route);
    res.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8",
    });
    res.end("роут додано до списку");
  }
});

// starts a simple http server locally on port 3000
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});

// run with `node server.mjs`
