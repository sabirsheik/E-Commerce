const express = require("express");
const router = express.Router();
const {
postCart,
updateCartQuantity,
getCarts,
cartMerge,
} = require("../controllers/cartControllers");
const {
    auth,
    optionalAuth,
} = require("../Middleware/authMiddleware");

router.post("/create", optionalAuth, postCart)
router.put("/update", optionalAuth, updateCartQuantity)
router.delete("/delete", optionalAuth, updateCartQuantity)
router.get("/carts", optionalAuth, getCarts);
router.post("/merge", auth, cartMerge);


module.exports = router;