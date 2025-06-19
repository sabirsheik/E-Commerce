const express = require("express");
const router = express.Router();
const { auth } = require("../Middleware/authMiddleware");
const {
    checkoutPost,
    checkoutPay,
    checkoutFinalize,
} = require("../controllers/checkoutControllers");

router.post("/create", auth, checkoutPost);
router.put("/:id/pay", auth, checkoutPay)
router.post("/:id/finalize", auth, checkoutFinalize)

module.exports = router;