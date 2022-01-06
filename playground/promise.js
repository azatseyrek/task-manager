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
