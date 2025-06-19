import MyOrderPages from './MyOrderPages';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleMoveHome = ()=>{
    navigate('/');
  };
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-xl shadow-md p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
                SA
              </div>
              <h1 className="text-xl font-semibold text-gray-800">Sabir Ali</h1>
              <p className="text-gray-500 text-sm">sabir@example.com</p>
            </div>
            <button onClick={handleMoveHome} className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md transition duration-300">
              Logout
            </button>
            {/* Additional Profile Links or Info (Optional) */}
            {/* <div className="mt-6">...</div> */}
          </div>

          {/* Orders or Content Section */}
          <div className="w-full md:w-2/3 lg:w-3/4">
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
