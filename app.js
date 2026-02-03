const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todo.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/todos", todoRoutes);

// global error
app.use(errorHandler);

module.exports = app;
