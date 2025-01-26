const db = require("../db/queries");

async function getBooks(req, res) {
  const books = await db.getAllbooks();
  res.render("home", { title: "Inventory Application", books: books });
}

async function getForm(req, res) {
  res.render("form");
}
async function createBooks(req, res) {
  const { book, author, category } = req.body;
  await db.createBooks(book, author, category);
  res.redirect("/");
}

async function updateBooks(req, res) {
  const { book, author, category, id } = req.body;
  await db.updateBooks(book, author, category, id);
  res.redirect("/");
}

async function deleteBook(req, res) {
  const { bookId } = req.body;
  await db.deleteBook(bookId);
  res.send("Book deleted");
}
module.exports = {
  getBooks,
  createBooks,
  getForm,
  updateBooks,
  deleteBook,
};
