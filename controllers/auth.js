const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const User = require("../models/user")

// ****************************************************
exports.register = async (req, res) => {
  try {
    // check user
    const { email, password } = req.body
    var user = await User.findOne({email})
    if (user) {
      res.status(400).send("user Already exists !!, At register auth controllers")
    }else {
      // gen salt
      const salt = await bcrypt.genSalt(10)
      user = new User({
        email,
        password
      })
      // encrypt
      user.password = await bcrypt.hash(password, salt)
      await user.save()
      res.send("Register success")
    }
  }catch(err) {
    console.log(err, "!!, At register auth controllers")
    res.status(500).send("Server Error !!, At register auth controllers")
  }
}

// *********************************************************
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    var user = await User.findOneAndUpdate({email}, {new:true})
    if (user && user.enabled) {
      // Check password
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).send("password Invalid !!, At login auth controllers")
      }else {
        // payload
        const payload = {
          user: {
            email: user.email,
            role: user.role
          }
        }
        // Gen token
        jwt.sign(payload, "jwtSecret", {expiresIn: 3600}, (err,token) => {
          if (err) {
            throw err
          }else {
            res.json({token, payload})
          }
        })
      }
    }else {
        return res.status(400).send("user not found !!, At login auth controllers")
    }
  }catch(err) {
    console.log(err, ", At login auth controllers")
    res.status(500).send("Server Error !!, At login auth controllers")
  }
}

// ******************************************************
exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({email: req.user.user.email})
    .select("-password").exec()
    res.send(user)
   }catch(err) {
    console.log(err, ", At currentUser auth controllers")
    res.status(500).send("Server Error !!, , At currentUser auth controllers")
  }
}

// **********************
exports.test = (req,res) => {
  res.send("Hello test")
}