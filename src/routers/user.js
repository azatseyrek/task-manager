const express = require("express");
const { Router } = require("express");
const User = require('../models/user')

const router = Router();

router.post("/users/login", async (req, res)=> {

  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);

    //we created generateAuthToken insede the model/user.js
    const token = await user.generateAuthToken()
    res.send({user, token})
  } catch (e) {
    res.status(400).send()
  }
})

router.post("/users", async (req, res) => {
    const user = new User(req.body);
    
    try {
      await user.save();
      const token = await user.generateAuthToken()
      res.status(201).send({user, token});
    } catch (e) {
      res.status(400).send(e);
    }
  });
  
  router.get("/users", async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  router.get("/users/:id", async (req, res) => {
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


  router.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) => {
      return allowedUpdates.includes(update);
    });
    
    const _id = req.params.id;
    
    if (isValidOperation) {
      try {
          const user = await User.findById(req.params.id)

          updates.forEach((update)=> {
            user[update]= req.body[update]
          })

          await user.save()

        // const user = await User.findByIdAndUpdate(_id, req.body, {
        //   new: true,
        //   runValidators: true,
        // });
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

  router.delete('/users/:id', async (req,res)=> {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      if(!user) {
        return res.status(404).send()
      }else {
        res.send(user)
        console.log('user deleted');
      }
      
    } catch (e) {
      res.status(500).send(' there is no user ')
    }
  })

module.exports = router;
