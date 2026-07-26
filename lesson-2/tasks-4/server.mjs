// Задача 4. Розробити серверну частину додатку, який за відповідними маршрутами (“/”, “/coffee”, “/music”)
// повертає створені HTML документи (розмістіть їх там же, де і додаток),
// що описують: інформацію про себе, інфорімацію про улюблену кав’ярню,  інформацію про улюблений музичний гурт.

// server.mjs
import { createServer } from "node:http";
import ejs from "ejs";

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

 
   let data = {
    title: "Головна сторінка",
    name: "Kolya",
  };


  if(req.method === "GET" && url.pathname === "/coffee") {
      data.title = "про каву"
      data.name= "амерікано"
  }


  else if (req.method === "GET" && url.pathname === "/music") {
      data.title= "про музику"
      data.name= "попса"
   
  }

const html = await ejs.renderFile("./mainPage.ejs", data);
  res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
  res.end(html);
});

// starts a simple http server locally on port 3000
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});

// run with `node server.mjs`
