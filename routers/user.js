const express = require("express")
const router = express.Router()

const { listUser,
        changeStatus,
        changeRole,
        deleteUser,
        changePassword } = require("../controllers/user")

// middleware
const { auth, adminCheck } = require("../middlewares/auth")

// Endpoint http://localhost:8000/api/user
router.get("/user/list-user", auth, adminCheck, listUser)
router.put("/user/change-status", auth, adminCheck, changeStatus)
router.put("/user/change-role", auth, adminCheck, changeRole)


router.delete("/user/delete-user/:id", auth, adminCheck, deleteUser)
router.put("/user/change-password/:id", auth, adminCheck, changePassword)

module.exports = router