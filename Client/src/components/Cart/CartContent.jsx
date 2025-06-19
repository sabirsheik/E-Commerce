import React from "react";
import { MdDelete } from "react-icons/md";

const CartContent = () => {
  const cartItems = [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 100,
      image:
        "https://fastly.picsum.photos/id/223/200/200.jpg?hmac=CNNyWbBcEAJ7TPkTmEEwdGrLFEYkxpTeVwJ7U0LB30Y",
    },
    {
      productId: 2,
      name: "Jeans",
      size: "M",
      color: "blue",
      quantity: 1,
      price: 130,
      image: "https://picsum.photos/200?random=1",
    },
  ];

  return (
    <>
      {cartItems.map((product, index) => (
        <div
          key={index}
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
                size : {product.size} | color : {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button className="border rounded px-2 py-[2px] text-xl font-medium hover:bg-[#ff1414] hover:text-white">
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button className="border rounded px-2 py-[2px] text-xl font-medium hover:bg-e-hover hover:text-white">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>Rs {product.price.toLocaleString()}</p>
            <button>
              <MdDelete className="h-6 w-6 mt-2 text-red-500 hover:text-[#ff1414]" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartContent;
