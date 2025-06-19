const Checkout = require("../models/Checkout");
const Product = require("../models/products");
const Order = require("../models/order");
const Cart = require("../models/Cart");

// Post api/checkout/checkout

const checkoutPost = async (req, res, next) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
        req.body;
    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: "no item in checkout" });
    }
    try {
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItem: checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        });
        console.log(`Checkout created for user : ${req.user._id}`);
        return res.status(201).json(newCheckout);
    } catch (error) {
        return res.status(500).json({
            message: "Server error while updating cart",
            error: error.message,
        });
    }
};

// PUT /api/checkout/:id/pay
const checkoutPay = async (req, res, next) => {
  try {
    const { paymentStatus, paymentDetails } = req.body || {};

    if (!paymentStatus || paymentStatus !== "paid") {
      return res.status(400).json({ message: "Invalid or missing payment status" });
    }

    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    // Update payment details
    checkout.isPaid = true;
    checkout.paymentStatus = paymentStatus;
    checkout.paymentDetails = paymentDetails;
    checkout.paidAt = new Date();

    await checkout.save();

    res.status(200).json(checkout);
  } catch (error) {
    console.error("Checkout Payment Error:", error);
    res.status(500).json({
      message: "Server error while updating checkout",
      error: error.message,
    });
  }
};


// POST /api/checkout/:id/finalize
const checkoutFinalize = async (req, res, next) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not Found" });
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.orderItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });
            checkout.isFinalized = true;
            checkout.finalizedAt = new Date();
            await checkout.save();

            // delete the cart associated with the user
            await Cart.findOneAndDelete({ user: checkout.user });
            return res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            return res.status(400).json({ message: "Checkout already Finalized" });
        } else {
            return res.status(400).json({ message: "Checkout is not paid" });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server error while updating cart",
            error: error.message,
        });
    }
};
module.exports = {
    checkoutPost,
    checkoutPay,
    checkoutFinalize,
};
