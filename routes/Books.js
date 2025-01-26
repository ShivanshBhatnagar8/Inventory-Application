const express = require("express");
const routes = express.Router();
const {
  getBooks,
  createBooks,
  getForm,
  updateBooks,
  deleteBook,
} = require("../controllers/BookController");

routes.get("/", getBooks);
routes.post("/", updateBooks);
routes.delete("/delete", deleteBook);
routes.get("/form", getForm);
routes.post("/form", createBooks);
module.exports = routes;
