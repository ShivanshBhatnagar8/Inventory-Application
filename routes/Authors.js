const express = require("express");
const routes = express.Router();
const { getAuthors } = require("../controllers/AuthorController");

routes.get("/", getAuthors);

//routes.get("/", getUser);
// routes.get("/new", createUsernameGet);

// routes.post("/new", createUsernamePost);

// routes.get("/ok", deleteNullUsers);

// routes.get("/delete", deleteAllUsers);
module.exports = routes;
