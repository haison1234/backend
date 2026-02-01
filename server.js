const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/Todo");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect DB
mongoose
  .connect("mongodb+srv://Son:KZBx9RgZAYz5RRPg@master.3bmva6y.mongodb.net/todo")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// GET all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// ADD todo
app.post("/todos", async (req, res) => {
  const todo = await Todo.create({
    title: req.body.title,
  });
  res.status(201).json(todo);
});

app.put("/todos/:id", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true } 
  );

  res.json(updatedTodo);
});

app.delete('/todos/:id', async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  
  if (!deletedTodo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  
  res.json({ message: "Delete successful", id: req.params.id });
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
