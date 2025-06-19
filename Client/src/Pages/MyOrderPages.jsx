import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrderPages = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "12345",
          createdAt: new Date(),
          shippingAddress: {
            country: "Pakistan",
            city: "Karachi",
            streetAddess: "Tesil Chok Nazd Mb Shop",
          },
          orderItem: [
            {
              name: "Product 1",
              image: "https://picsum.photos/200?random=1",
              alt: "Order img 1",
            },
          ],
          totalPrice: 4999,
          isPaid: true,
        },
        {
          _id: "7987",
          createdAt: new Date(),
          shippingAddress: {
            country: "Pakistan",
            city: "Chakwal",
            streetAddess: "Steel Mill Nazd Mb Shop",
          },
          orderItem: [
            {
              name: "Product 2",
              image: "https://picsum.photos/200?random=4",
              alt: "Order img 2",
            },
          ],
          totalPrice: 6999,
          isPaid: true,
        },
        {
          _id: "34567",
          createdAt: new Date(),
          shippingAddress: {
            country: "Pakistan",
            city: "Chakwal",
            streetAddess: "Steel Mill Nazd Mb Shop",
          },
          orderItem: [
            {
              name: "Product 1",
              image: "https://picsum.photos/200?random=4",
              alt: "Order img 1",
            },
            {
              name: "Product 2",
              image: "https://picsum.photos/200?random=7",
              alt: "Order img 2",
            },
            {
              name: "Product 3",
              image: "https://picsum.photos/200?random=8",
              alt: "Order img 3",
            },
          ],
          totalPrice: 8999,
          isPaid: true,
        },
        {
          _id: "2374627",
          createdAt: new Date(),
          shippingAddress: {
            country: "Pakistan",
            city: "Faislabad",
            streetAddess: "Samana bad Nazd Mb Shop",
          },
          orderItem: [
            {
              name: "Product 1",
              image: "https://picsum.photos/200?random=4",
              alt: "Order img 1",
            },
            {
              name: "Product 2",
              image: "https://picsum.photos/200?random=7",
              alt: "Order img 2",
            },
            {
              name: "Product 3",
              image: "https://picsum.photos/200?random=8",
              alt: "Order img 3",
            },
          ],
          totalPrice: 8999,
          isPaid: false,
        },
      ];
      setOrders(mockOrders);
    }, 1000);
  }, []);

  const handleRowClick = (orderId)=>{
    navigate(`/order/${orderId}`)
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🧾 My Orders
      </h1>

      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
        <table className="min-w-full table-fixed">
          <thead className="bg-gradient-to-r from-gray-200 via-gray to-gray-100 text-gray-700">
            <tr className="text-sm sm:text-base text-left whitespace-nowrap">
              <th className="px-4 py-4 font-semibold tracking-wide">Image</th>
              <th className="px-4 py-4 font-semibold tracking-wide">
                Order ID
              </th>
              <th className="px-4 py-4 font-semibold tracking-wide">
                Created At
              </th>
              <th className="px-4 py-4 font-semibold tracking-wide">
                Shipping Address
              </th>
              <th className="px-4 py-4 font-semibold text-center tracking-wide">
                Items
              </th>
              <th className="px-4 py-4 font-semibold text-center tracking-wide">
                Price (Rs.)
              </th>
              <th className="px-4 py-4 font-semibold text-center tracking-wide">
                Payment Status
              </th>
            </tr>
          </thead>

          <tbody className="text-gray-800 text-sm sm:text-base">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                onClick={()=>handleRowClick(order._id)}
                  key={order._id}
                  className="hover:bg-gray-50 cursor-pointer transition duration-200 border-b"
                >
                  <td className="p-4">
                    <img
                      src={order.orderItem[0].image}
                      alt={order.orderItem[0].alt}
                      className="w-12 h-12 rounded-md object-cover border shadow-sm hover:scale-105 transition-transform duration-200"
                    />
                  </td>
                  <td className="p-4 font-medium whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="p-4">
                    <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    {order.shippingAddress
                      ? `${order.shippingAddress.streetAddess}, ${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className="p-4 text-center font-semibold">
                    {order.orderItem.length}
                  </td>
                  <td className="p-4 text-center font-semibold">
                    {order.totalPrice.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-gray-400 py-10 font-medium"
                >
                  Loading orders...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrderPages;
