const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const User = require("../models/user")

exports.listUser = async (req, res) => {
  try {
   const user = await User.find({})
   .select("-password").exec()
   res.send(user)
  }catch(err) {
    console.log(err, "!!, At listUser user controllers")
    res.status(500).send("Server Error !!, At listUser user controllers")
  }
}

exports.changeStatus = async (req, res) => {
  try {
    // console.log(req.body)
   const user = await User
   .findOneAndUpdate({_id: req.body.id}, {enabled: req.body.enabled})
   .select("-password").exec()
   res.send(user)
  }catch(err) {
    console.log(err, "!!, At changeStatus user controllers")
    res.status(500).send("Server Error !!, At changeStatus user controllers")
  }
}

exports.changeRole = async (req, res) => {
  try {
    // console.log(req.body)
   const user = await User
   .findOneAndUpdate({_id: req.body.id}, {role: req.body.role})
   .select("-password").exec()
   res.send(user)
  }catch(err) {
    console.log(err, "!!, At changeRole user controllers")
    res.status(500).send("Server Error !!, At changeRole user controllers")
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findOneAndDelete({_id: id})
    .select("-password").exec()
    res.send(user)
  }catch(err) {
    console.log(err)
    res.status(500).send("Server Error !, deleteUser controllers")
  }
}

exports.changePassword = async (req, res) => {
  try {
    // console.log(req.body.password)
    const { id, password } = req.body
    // Gen Salt
    const salt = await bcrypt.genSalt(10)
    // Encrypt
    const enPassword = await bcrypt.hash(password, salt)
    const user = await User
    .findOneAndUpdate({_id: id}, {password: enPassword})
    .select("-password").exec()
    res.send(user)
  }catch(err) {
    console.log(err, "!!, At changePassword user controllers")
    res.status(500).send("Server Error !!, At changePasssword user controllers")
  }
}