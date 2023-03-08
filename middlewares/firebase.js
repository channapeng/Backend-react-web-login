const jwt = require("jsonwebtoken")
const connectDB = require("../configs/db_firebase")

exports.auth = async (req, res, next) => {
  try {
    const firebaseUser = await connectDB
    .auth()
    .verifyIdToken(req.headers.authtoken)
    req.user = firebaseUser
    next()
  }catch(err) {
    console.log(err, " !!, At db_firebase auth middlewares ")
    res.status(500).send("Token Invalid !!, At db_firebase auth middlewares")
  }
}