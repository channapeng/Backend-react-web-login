const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: String,
    default: "user"
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, {timestamps: true})

module.exports = User = mongoose.model("users", userSchema)