import React from "react";

const checkout = {
  _id: "123",
  createdAt: new Date(),
  checkoutItems: [
    {
      productId: "1",
      name: "Jacket",
      color: "Black",
      size: "M",
      price: "2000",
      quantity: 1,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: "2",
      name: "Jacket",
      color: "Red",
      size: "M",
      price: "5000",
      quantity: 1,
      image: "https://picsum.photos/200?random=2",
    },
  ],
  shippingAddress: {
    address: "123 Fashion Street",
    city: "Chakwal",
    country: "Pakistan",
  },
};

const OrderConfirmationPage = () => {
  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-emerald-600 mb-10">
          🎉 Thank You for Your Order!
        </h1>

        {/* Order Info */}
        <div className="flex flex-col md:flex-row justify-between mb-10 border-b pb-6">
          <div>
            <h2 className="text-lg font-semibold mb-1 text-gray-800">
              Order ID: <span className="font-normal text-gray-600">{checkout._id}</span>
            </h2>
            <p className="text-sm text-gray-500">
              Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              Order Time:{" "}
              {new Date(checkout.createdAt).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-emerald-700 text-sm font-medium">
            Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}
          </div>
        </div>

        {/* Items */}
        <div className="space-y-6 mb-10">
          {checkout.checkoutItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between border p-4 rounded-lg bg-gray-50 shadow-sm"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded object-cover mr-4 border"
                />
                <div>
                  <h4 className="text-md font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | Size {item.size}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-md font-semibold text-gray-800">Rs {item.price}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment & Delivery */}
        <div className="grid md:grid-cols-2 gap-6 border-t pt-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Payment Method</h4>
            <p className="text-gray-600 text-sm">JazzCash / EasyPaisa</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Delivery Address</h4>
            <p className="text-gray-600 text-sm">{checkout.shippingAddress.address}</p>
            <p className="text-gray-600 text-sm">
              {checkout.shippingAddress.city}, {checkout.shippingAddress.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
