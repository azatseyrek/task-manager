const { Router } = require("express");
const express = require("express");
const Task = require("../models/task");

const router = Router();

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((key) => {
    return allowedUpdates.includes(key);
  });

  const _id = req.params.id;

  if (isValidOperation) {
    try {
      const task = await Task.findById(_id)

          updates.forEach((update)=> {
            task[update]= req.body[update]
          })

          await task.save()

      // const task = await Task.findByIdAndUpdate(_id, req.body, {
      //   new: true,
      //   runValidators: true,
      // });
      if (!task) {
        return res.status(404).send("Task not found");
      } else {
        res.send(task);
      }
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    res.status(400).send("invalid parameter for task");
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    } else {
      res.send(task);
      console.log("task deleted");
    }
  } catch (e) {
    res.status(500).send(" there is no task ");
  }
});

router.get("/tasks/:id", async (req, res) => {
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

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/tasks", async (req, res) => {
  const task = await new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
    console.log("task added");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
