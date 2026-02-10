import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingaddress, setShippingaddress] = useState({
    firstname: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate("/login", { state: { from: location } });
    }
  }, [user, navigate, location]);

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId(123);
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment Successful", details);
    navigate("/order-confirmation");
  };

  if (!user) {
    return <div>Loading...</div>; // Or a spinner
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
        {/* Left Section */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl uppercase mb-6">Checkout</h2>
          <form action="" onSubmit={handleCreateCheckout}>
            <h3 className="text-lg mb-4">Contact Details</h3>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user?.email || ""}
                className="w-full p-2 border rounded cursor-not-allowed"
                disabled
                id=""
              />
            </div>
            <h3 className="text-lg mb-4">Delivery</h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={shippingaddress.firstname}
                  onChange={(e) => {
                    setShippingaddress({
                      ...shippingaddress,
                      firstname: e.target.value,
                    });
                  }}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={shippingaddress.lastName}
                  onChange={(e) => {
                    setShippingaddress({
                      ...shippingaddress,
                      lastName: e.target.value,
                    });
                  }}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={shippingaddress.address}
                onChange={(e) =>
                  setShippingaddress({
                    ...shippingaddress,
                    address: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  value={shippingaddress.city}
                  onChange={(e) => {
                    setShippingaddress({
                      ...shippingaddress,
                      city: e.target.value,
                    });
                  }}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={shippingaddress.postalCode}
                  onChange={(e) => {
                    setShippingaddress({
                      ...shippingaddress,
                      postalCode: e.target.value,
                    });
                  }}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-gray-700">
                Country
              </label>
              <input
                type="text"
                value={shippingaddress.country}
                onChange={(e) =>
                  setShippingaddress({
                    ...shippingaddress,
                    country: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                value={shippingaddress.phone}
                onChange={(e) =>
                  setShippingaddress({
                    ...shippingaddress,
                    phone: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mt-6">
              {!checkoutId ? (
                <button type="submit" className="w-full bg-e-black text-white py-3 rounded">
                  Continue to Payment
                </button>
              ) : (
                <div>
                  <h3 onClick={handlePaymentSuccess} className="cursor-pointer text-lg mb-4">
                    Cash On Delivery or Payoneer
                  </h3>
                </div>
              )}
            </div>
          </form>
        </div>
        {/* Right Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg mb-4">Order Summary</h3>
          <div className="border-t py-4 mb-4">
            {cart?.products?.map((product, index) => (
              <div key={index} className="flex items-start justify-between py-2 border-b">
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-2/4 object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-md">{product.name}</h3>
                    <p className="text-gray-500">Size: {product.size}</p>
                    <p className="text-gray-500">Color: {product.color}</p>
                  </div>
                </div>
                <p className="text-xl">Rs{product.price}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center text-lg mb-4">
            <p>Subtotal</p>
            <p>Rs{cart?.totalPrice?.toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center text-lg">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
            <p>Total</p>
            <p>Rs{cart?.totalPrice?.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
