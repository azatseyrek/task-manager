const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    validate: function (value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if(value.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain 'password'")
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate: function (value) {
      if (value < 0) {
        throw new Error("Age must be positive number");
      }
    },
  },
});

// const me = new User({
//   name: "       Burcu ",
//   age: 30,
//   email: "burcu@Test.com",
//   password: '123asd123'
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const Task = mongoose.model("Tasks", {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default:false
  },
});

const task = new Task({
  description: "asdasdasd",
  completed: true,
});

task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch((error) => {
    console.log(error);
  });
