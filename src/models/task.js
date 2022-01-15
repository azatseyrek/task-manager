const mongoose = require("mongoose");
const validator = require("validator");

taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    
  })
  
  taskSchema.pre("save", async function(next){
    const task = this
    
    if (task.isModified("description")) {
          task.description = await task.description
    }

    next()
  })
  
  
  const Task = mongoose.model("Tasks", taskSchema);
  module.exports = Task