const jwt = require("jsonwebtoken")
const User = require("../models/user")

exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authtoken
    if (!token) {
      console.log("No token, At auth middlewares")
      return res.status(401).send("No token, At auth middlewares")
    }else {
      const decoded = jwt.verify(token, "jwtSecret")
      req.user = decoded
      next()
    }
  }catch(err) {
    console.log(err, " !!, At auth.js middlewares ")
    res.status(500).send("Backend Token Invalid !!, At auth middlewares")
  }
}

exports.adminCheck = async (req, res, next) => {
  try {
    const { email } = req.user.user
    const adminUser = await User.findOne({email})
    .select("-password").exec()
    if (adminUser.role !== "admin") {
      console.log("Admin access denied !!, At adminCheck auth middlewares")
      return res.status(403).send(err, "Admin access denied !!, At adminCheck auth middlewares")
    }else {
      next()
    }
  }catch(err) {
    console.log(err, "Admin access denied !!, At adminCheck auth middlewares")
    res.status(401).send("Admin access denied !!, At adminCheck auth middlewares")
  }
}