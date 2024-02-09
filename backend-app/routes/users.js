const User = require("../models/user")
const router = require("express").Router()
const bcrypt = require("bcrypt")

//Register
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })

    //save user and response
    const user = await newUser.save()
    res.status(200).json(user._id)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})



module.exports = router