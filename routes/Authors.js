const express = require("express");
const routes = express.Router();
const { getAuthors } = require("../controllers/AuthorController");

routes.get("/", getAuthors);

module.exports = routes;
