import MyOrderPages from './MyOrderPages';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlices';
import { clearCart } from '../redux/slices/CartSlice';
import { toast } from 'sonner';
import { useEffect } from 'react';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [user, navigate, location]);

  const handleMoveHome = () => {
    dispatch(logout());
    dispatch(clearCart());
    toast.success('Logged out successfully!');
    navigate('/');
  };

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Profile Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-xl shadow-md p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <h1 className="text-xl font-semibold text-gray-800">{user?.name || 'User'}</h1>
              <p className="text-gray-500 text-sm">{user?.email || 'user@example.com'}</p>
            </div>
            <button onClick={handleMoveHome} className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md transition duration-300">
              Logout
            </button>
            {/* Additional Profile Links or Info (Optional) */}
            {/* <div className="mt-6">...</div> */}
          </div>

          {/* Content Section */}
          <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
            {/* Cart Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">My Cart</h2>
              {cart?.products && cart.products.length > 0 ? (
                <div className="space-y-4">
                  {cart.products.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-semibold">Rs {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <p className="font-semibold">Rs {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-lg font-bold">Rs {cart.totalPrice?.toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Your cart is empty.</p>
              )}
            </div>

            {/* Orders Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">My Orders</h2>
              <MyOrderPages />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
