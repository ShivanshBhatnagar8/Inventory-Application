const path = require("node:path");
const express = require("express");
const app = express();
require("dotenv").config();
const authorRoutes = require("./routes/Authors");
const bookRoutes = require("./routes/Books");
const categoryRoutes = require("./routes/Categories");

app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));
app.use("/", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/category", categoryRoutes);
app.listen(3000);
