import express from "express";
const router = express.Router();

const data = {
  title: "Каталог продуктів",
  products: [
    {
      id: 1,
      title: "Ноутбук Lenovo",
      description: "Ноутбук для роботи та навчання",
      price: 28500,
      quantity: 5,
    },
    {
      id: 2,
      title: "Навушники Sony",
      description: "Бездротові навушники з шумозаглушенням",
      price: 6200,
      quantity: 12,
    },
    {
      id: 3,
      title: "Клавіатура Logitech",
      description: "Механічна клавіатура з підсвічуванням",
      price: 3900,
      quantity: 8,
    },
  ],
};

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ message: "I wish we had some information to give you ☹️ lol" });
});

router.get("/products", function (req, res, next) {
res.render("products", data);
});
router.get("/addproduct", function (req, res, next) {
  res.render("addProduct", {
    title: "Створити продукт",
  });
});

export default router;
