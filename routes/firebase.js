const express = require("express")
const router = express.Router()

const { register, currentUser } = require("../controllers/firebase")

const { auth } = require("../middlewares/firebase")

// Endpoint http://localhost:8000/api/register-firebase
router.post("/register-firebase", auth, register)
router.post("/current-user-firebase", auth, currentUser)

module.exports = router