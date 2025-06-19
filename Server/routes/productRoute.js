const express = require("express");
const router = express.Router();
const { auth, checkRole } = require("../Middleware/authMiddleware");
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    productBestSeller,
    productNewArrivals,
    getProduct,
    productSimilar,
} = require("../controllers/productControllers");


router.post("/create", auth, checkRole, createProduct);
router.put("/:id", auth, checkRole, updateProduct);
router.delete("/:id", auth, checkRole, deleteProduct);
router.get("/all-products", getAllProducts);
router.get("/product-bestSeller", productBestSeller);
router.get("/product-newArrivals", productNewArrivals);
router.get("/product/:id", getProduct);
router.get("/product-similar/:id", productSimilar);

module.exports = router;