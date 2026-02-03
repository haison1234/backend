const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

// GET all todos
router.get("/", todoController.getTodos);

// ADD todo
router.post("/", todoController.createTodo);

// UPDATE title
router.put("/:id", todoController.updateTodo);

// DELETE todo
router.delete("/:id", todoController.deleteTodo);

// TOGGLE completed
router.patch("/:id/toggle", todoController.toggleTodo);

module.exports = router;
