const User = require("../models/user")

exports.register = async (req, res) => {
  try {
    const { name, email } = req.user
    const user = await User.findOneAndUpdate({name},{email},{new: true})
    if (user) {
      console.log("user Alerady exists, At firebase register controllers")
      res.status(400).send("user Already exists !!, At firebase register controllers")
    }else {
      const newUser = await User({
        name,
        email
      }).save()
      console.log("Register success", newUser)
      res.json(newUser)
    }
  }catch(err) {
    console.log(err, "!!, At firebase register controllers")
    res.status(500).send("Server Error !!, At firebase register controllers")
  }
}

exports.currentUser = async (req, res) => {
  try {
    // check user
    const user = await User.findOne({ email: req.user.email }).exec()
    res.send(user)
  }catch(err) {
    console.log(err, "!!, At firebase currentUser controllers")
    res.status(500).send("Server Error !!, At firebase currentUser controllers")
  }
}