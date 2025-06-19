import React from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCartDrawer();
    navigate("/checkout");
  };

  return (
    <>
    {/* Cart Section */}
      {/* Overlay Background */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleCartDrawer}
        ></div>
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-3/4 md:w-[28rem] bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col rounded-l-xl ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white rounded-tl-xl">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            Your Shopping Cart
          </h2>
          <button
            onClick={toggleCartDrawer}
            className="text-gray-600 hover:text-red-500 transition"
            aria-label="Close Cart"
          >
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar bg-gray-50">
          <CartContent />
        </div>

        {/* Checkout Footer */}
        <div className="px-6 py-4 bg-white border-t sticky bottom-0">
          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 rounded-lg text-base font-semibold hover:bg-gray-900 transition-all duration-200"
          >
            Proceed to Checkout
          </button>
          <p className="text-xs text-gray-600 mt-2 text-center">
            Shipping & discounts are calculated at checkout.
          </p>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
