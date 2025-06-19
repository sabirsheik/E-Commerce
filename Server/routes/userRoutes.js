const express = require("express");
const {
    register,
    login,
    userProfile
} = require("../controllers/usersControllers");
const {auth} = require("../Middleware/authMiddleware");

const router = express.Router();

// @route POST /api/users/register
// @des Register a new user
// @access public

router.post("/register", register)
router.post("/login", login)
router.get("/profile",auth, userProfile)

module.exports = router;