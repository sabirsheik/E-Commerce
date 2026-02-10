import React from "react";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { updateCartItemQuantity, removeFromCart } from "../../redux/slices/CartSlice";
import { toast } from "sonner";

const CartContent = () => {
  const { cart, loading } = useSelector((state) => state.cart);
  const { user, guestID } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleQuantityChange = (productId, size, color, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(
      updateCartItemQuantity({
        productId,
        quantity: newQuantity,
        size,
        color,
        guestId: guestID,
        userId: user?.id,
      })
    ).then(() => {
      toast.success("Quantity updated!");
    });
  };

  const handleRemoveItem = (productId, size, color) => {
    dispatch(
      removeFromCart({
        productId,
        guestId: guestID,
        userId: user?.id,
        size,
        color,
      })
    ).then(() => {
      toast.success("Item removed from cart!");
    });
  };

  if (!cart?.products || cart.products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <>
      {cart.products.map((product, index) => (
        <div
          key={`${product.productId}-${product.size}-${product.color}`}
          className="flex items-center justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-e-hover ">
                size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.productId,
                      product.size,
                      product.color,
                      product.quantity - 1
                    )
                  }
                  disabled={loading}
                  className="border rounded px-2 py-[2px] text-xl font-medium hover:bg-[#ff1414] hover:text-white disabled:opacity-50"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.productId,
                      product.size,
                      product.color,
                      product.quantity + 1
                    )
                  }
                  disabled={loading}
                  className="border rounded px-2 py-[2px] text-xl font-medium hover:bg-e-hover hover:text-white disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>Rs {product.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveItem(product.productId, product.size, product.color)
              }
              disabled={loading}
              className="disabled:opacity-50"
            >
              <MdDelete className="h-6 w-6 mt-2 text-red-500 hover:text-[#ff1414]" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartContent;
