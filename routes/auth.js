// ** config
// routers
const express = require("express")
const router = express.Router()

// controllers
const { 
  register,
  login,
  currentUser,
  test 
} = require("../controllers/auth")

// middlewares
const { auth, adminCheck } = require("../middlewares/auth")

// ***************************************************
// ** call
// routers
// Endpoint http://localhost:8000/api/register
router.post("/register", register)
router.post("/login", login)
router.get("/test", test)

router.post("/current-user", auth, currentUser)
router.post("/current-admin", auth, adminCheck, currentUser)

module.exports = router