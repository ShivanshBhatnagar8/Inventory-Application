const db = require("../db/queries");

async function getAuthors(req, res) {
  const authors = await db.getAuthors();
  res.render("author", { title: "Inventory Application", authors: authors });
}

module.exports = {
  getAuthors,
};
