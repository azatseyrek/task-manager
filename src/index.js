const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json()); //parse json auto

app.use(userRouter);

app.use(taskRouter);

// const myFunction = async () => {
//     const password = "Miran123"
//     const hashedPassword = await bcrypt.hash(password, 8)
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare("Miran123", hashedPassword)

//     console.log(isMatch);

// }

// myFunction()











const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Port started at ${port}!`);
});
