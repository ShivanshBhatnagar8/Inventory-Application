const e = require("express");
const pool = require("./pool");

async function getAllbooks() {
  const { rows } = await pool.query(
    "SELECT id,name, (SELECT name FROM authors WHERE authors.id = books.author_id) AS author_name,(SELECT name FROM categories WHERE categories.id = books.categories_id) AS category_name FROM books"
  );
  return rows;
}
async function getAuthors() {
  const { rows } = await pool.query("SELECT * FROM authors");
  return rows;
}
async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getExistingAuthor(authorName) {
  const { rows: existingAuthors } = await pool.query(
    "SELECT * FROM authors WHERE name=$1 LIMIT 1",
    [authorName]
  );
  let authorId;
  if (existingAuthors.length === 0) {
    const { rows } = await pool.query(
      "INSERT INTO authors (name) VALUES ($1) RETURNING id",
      [authorName]
    );
    authorId = rows[0].id;
  } else {
    authorId = existingAuthors[0].id;
  }
  return authorId;
}

async function getExistingCategroy(categoryName) {
  const { rows: existingCategories } = await pool.query(
    "SELECT * FROM categories WHERE name=$1 LIMIT 1",
    [categoryName]
  );
  let categoryId;
  if (existingCategories.length === 0) {
    const { rows } = await pool.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING id",
      [categoryName]
    );
    categoryId = rows[0].id;
  } else {
    categoryId = existingCategories[0].id;
  }
  return categoryId;
}

async function createBooks(bookName, authorName, categoryName) {
  const { rows: existingBook } = await pool.query(
    "SELECT * FROM books WHERE name=$1 LIMIT 1",
    [bookName]
  );
  if (existingBook.length > 0) {
    return `Book ${bookName} already exists`;
  }

  let authorId = await getExistingAuthor(authorName);
  let categoryId = await getExistingCategroy(categoryName);

  await pool.query(
    "INSERT INTO books (name, author_id, categories_id) VALUES ($1, $2, $3)",
    [bookName, authorId, categoryId]
  );
}

async function updateBooks(bookName, authorName, categoryName, bookId) {
  await pool.query("UPDATE books SET name=$1 WHERE id = $2", [
    bookName,
    bookId,
  ]);

  // Handle Author
  let authorId = await getExistingAuthor(authorName);
  await pool.query("UPDATE books SET author_id=$1 WHERE id =$2", [
    authorId,
    bookId,
  ]);

  // Handle Category
  let categoryId = await getExistingCategroy(categoryName);
  await pool.query("UPDATE books SET categories_id=$1 WHERE id =$2", [
    categoryId,
    bookId,
  ]);
}

async function deleteBook(bookId) {
  await pool.query("DELETE FROM books WHERE id=$1", [bookId]);
}

module.exports = {
  getAllbooks,
  getAuthors,
  getCategories,
  createBooks,
  updateBooks,
  deleteBook,
};
