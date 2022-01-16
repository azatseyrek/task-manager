const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const bcrypt = require("bcrypt");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json()); //parse json auto

app.use(userRouter);

app.use(taskRouter);

app.listen(port, () => {
  console.log(`Port started at ${port}!`);
});

const jwt = require('jsonwebtoken');

const myFunction = async () => {
  const token =  await  jwt.sign({ _id: "test" }, 'secret', {expiresIn: "1 day"})
  console.log(token);

  const data = jwt.verify(token, 'secret')
  console.log(data);
}

myFunction();