const express = require("express");
const routes = express.Router();
const { getCategories } = require("../controllers/CategoryController");

routes.get("/", getCategories);
module.exports = routes;
