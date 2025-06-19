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
} = require("../Middleware/authMiddleware");

router.post("/create", auth, postCart)
router.put("/update", auth, updateCartQuantity)
router.delete("/delete", auth, updateCartQuantity)
router.get("/carts", auth, getCarts);
router.post("/merge", auth, cartMerge);


module.exports = router;