const db = require("../db/queries");

async function getCategories(req, res) {
  const categories = await db.getCategories();
  res.render("category", {
    title: "Inventory Application",
    categories: categories,
  });
}

module.exports = {
  getCategories,
};
