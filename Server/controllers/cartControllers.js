const Cart = require("../models/Cart");
const Product = require("../models/products");

// Helper Function to get a cart by user ID or guest ID
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
};

// POST /api/post/cart
const postCart = async (req, res, next) => {
    const { productId, quantity = 1, size, color, guestId, userId } = req.body;

    try {
        // Validate product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Fetch cart
        let cart = await getCart(userId, guestId);

        // If cart exists
        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            if (productIndex > -1) {
                // Update quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // Add new item
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0]?.url || "",
                    price: product.price,
                    size,
                    color,
                    quantity,
                });
            }

            // Recalculate total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            // Create new cart
            const newCart = await Cart.create({
                user: userId || undefined,
                guestId: guestId || `guest_${Date.now()}`,
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0]?.url || "",
                        price: product.price,
                        size,
                        color,
                        quantity,
                    },
                ],
                totalPrice: product.price * quantity,
            });

            return res.status(200).json(newCart);
        }
    } catch (error) {
        console.error("Cart error:", error.message);
        return res.status(500).json({
            message: "Server error while adding to cart",
            error: error.message,
        });
    }
};

// Put /api/cart
// update product quatntity in the cart for a guest or looged-in user

const updateCartQuantity = async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    try {
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart Not Found" });

        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex > -1) {
            // Update quantity or remove product
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex, 1); // remove product if quantity is zero
            }

            // ✅ Fix reduce to include initial value
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server error while updating cart",
            error: error.message,
        });
    }
};
// Delete api/delete

const deleteCart = async (req, res, next) => {
    const { productId, size, color, guestId, userId } = req.body;
    try {
        const cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart Not Fount" });
        const productIndex = cart.products.findIndex(
            (p) =>
                p.product.Id.toString() === productId &&
                p.size === size &&
                p.color === color
        );
        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product Not Found in cart" });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server error while updating cart",
            error: error.message,
        });
    }
};
// Display cart api/cart

const getCarts = async (req, res, next) => {
    const { userId, guestId } = req.query;
    try {
        const cart = await getCart(userId, guestId);
        if (cart) {
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Carts Not Found" });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server error while updating cart",
            error: error.message,
        });
    }
};

// Cart Post /api/cart/merge

const cartMerge = async (req, res, next) => {
    try {
        const guestId = req.body.guestId; // ✅ Fix here
        if (!guestId) {
            return res.status(400).json({ message: "guestId is required" });
        }

        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });

        if (guestCart) {
            if (guestCart.products.length === 0) {
                return res.status(400).json({ message: "Guest Cart is Empty" });
            }

            if (userCart) {
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex((item) =>
                        item.productId.toString() === guestItem.productId.toString() &&
                        item.size === guestItem.size &&
                        item.color === guestItem.color
                    );

                    if (productIndex > -1) {
                        // ✅ Update quantity if item exists
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    } else {
                        // ✅ Add new item if it doesn't exist
                        userCart.products.push(guestItem);
                    }
                });

                userCart.totalPrice = userCart.products.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                );

                await userCart.save();

                try {
                    // ✅ Delete guest cart after merging
                    await Cart.findOneAndDelete({ guestId }); // ❗Fix here — use `Cart.findOneAndDelete`, not `userCart.findOneAndDelete`
                } catch (error) {
                    console.log("Error deleting guest cart: ", error);
                }

                return res.status(200).json(userCart);

            } else {
                // ✅ Assign guest cart to user if user has no cart
                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();
                return res.status(200).json(guestCart);
            }

        } else {
            if (userCart) {
                // ✅ Guest cart already merged earlier
                return res.status(200).json(userCart);
            } else {
                return res.status(404).json({ message: "Guest Cart not found" });
            }
        }

    } catch (error) {
        return res.status(500).json({
            message: "Server error while updating cart",
            error: error.message,
        });
    }
};

module.exports = {
    postCart,
    updateCartQuantity,
    deleteCart,
    getCarts,
    cartMerge,
};
