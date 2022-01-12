const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const { get } = require("express/lib/request");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //parse json auto

app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
// update
app.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  const _id = req.params.id;

  if (isValidOperation) {
    try {
      const user = await User.findByIdAndUpdate(_id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(404).send();
      } else {
        res.send(user);
      }
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    res.status(400).send("invalid parameter")
  }
});

app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      res.status(404).send();
    } else {
      res.send(task);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post("/tasks", async (req, res) => {
  const task = await new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
    console.log("task added");
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`Port started at ${port}!`);
});
