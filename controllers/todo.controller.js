const Todo = require("../models/Todo");

// GET all todos
exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

// CREATE todo
exports.createTodo = async (req, res, next) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
    });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

// UPDATE title
exports.updateTodo = async (req, res, next) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (err) {
    next(err);
  }
};

// DELETE todo
exports.deleteTodo = async (req, res, next) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Delete successful", id: req.params.id });
  } catch (err) {
    next(err);
  }
};

// TOGGLE completed
exports.toggleTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (err) {
    next(err);
  }
};
