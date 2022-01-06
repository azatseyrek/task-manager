const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //parse json auto

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
        res.status(201)
        res.send(user);
    })
    .catch((e) => {
      res.status(400);
      res.send(e);
    });
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.status(201);
      res.send(task);
      console.log("Task Added Succesfully");
    })
    .catch((e) => {
      res.status(400);
      res.send(e);
    });
});

app.listen(port, () => {
  console.log(`Port started at ${port}!`);
});
