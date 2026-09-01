import assert from "node:assert/strict";
import test from "node:test";
import { checkSchema, matchedData, validationResult } from "express-validator";
import mongoose from "mongoose";

import Book from "../models/bookModels.mjs";
import BookService from "../services/bookService.mjs";
import BooksValidator from "../validation/booksValidation.mjs";

const validBook = {
  name: "Тестова книга",
  author: new mongoose.Types.ObjectId(),
  category: "Проза",
  year: 2020,
  price: 250,
  inStock: 5,
  description: "Опис тестової книги",
};

async function validateRequestBody(body) {
  const req = { body: { ...body } };
  const validationChains = checkSchema(
    BooksValidator.BooksValidationSchema,
    ["body"],
  );

  await Promise.all(validationChains.map((chain) => chain.run(req)));

  return {
    data: matchedData(req, { locations: ["body"] }),
    errors: validationResult(req).array(),
  };
}

test("модель приймає коректні дані книги", async () => {
  await assert.doesNotReject(() => new Book(validBook).validate());
});

test("модель відхиляє некоректні дані книги", async () => {
  const invalidBook = new Book({
    ...validBook,
    name: "A",
    year: 1800,
    price: -1,
  });

  await assert.rejects(
    () => invalidBook.validate(),
    (error) =>
      Boolean(error.errors.name) &&
      Boolean(error.errors.year) &&
      Boolean(error.errors.price),
  );
});

test("сервіс не звертається до бази з некоректним id", async () => {
  assert.equal(await BookService.getBookById("wrong-id"), null);
  assert.equal(await BookService.updateBook("wrong-id", validBook), null);
  assert.equal(await BookService.deleteBook("wrong-id"), null);
});

test("валідація очищає та перетворює дані форми", async () => {
  const { data, errors } = await validateRequestBody({
    ...validBook,
    name: "  Тестова книга  ",
    year: "2020",
    price: "250.50",
    inStock: "5",
  });

  assert.deepEqual(errors, []);
  assert.equal(data.name, "Тестова книга");
  assert.equal(data.year, 2020);
  assert.equal(data.price, 250.5);
  assert.equal(data.inStock, 5);
});

test("валідація форми повертає помилки для порожніх полів", async () => {
  const { errors } = await validateRequestBody({});
  assert.ok(errors.length >= 7);
});

test("валідація не приймає довільний текст замість id автора", async () => {
  const { errors } = await validateRequestBody({
    ...validBook,
    author: "weasf",
  });

  assert.ok(errors.some((error) => error.path === "author"));
});
