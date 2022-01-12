require("../src/db/mongoose");
const Task = require("../src/models/task");

Task.findByIdAndUpdate("61d73f0ac114d8eb639f05db", { completed: "false" })
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: "false" });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
// 61d73f0ac114d8eb639f05db

  const deleteTaskandCount = async (id) => {
     const task = await Task.findOneAndDelete("61d73f0ac114d8eb639f05db")
     const count = await Task.countDocuments()
     return count

  }

  deleteTaskandCount("61d73f0ac114d8eb639f05db").then((count)=> {
    console.log(count);
  }).catch((e) => {
    console.log(e);
  })