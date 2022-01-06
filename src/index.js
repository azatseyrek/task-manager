const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const { get } = require("express/lib/request");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //parse json auto

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201);
      res.send(user);
    })
    .catch((e) => {
      res.status(400);
      res.send(e);
    });
});

app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.status(500);
      res.send(e);
    });
});

app.get("/users/:id", (req, res) => {
  // console.log(req.params);
  const _id = req.params.id;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404);
      }
      res.send(user);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id;

  Task.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404);
      }
      res.send(task);
    })
    .catch((e) => {
      res.status(500).send();
      console.log(e);
    });
});

app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((e) => {
      res.status(500);
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
