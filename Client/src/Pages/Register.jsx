import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { registerUser } from "../redux/slices/authSlices";
import { mergeCart } from "../redux/slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { user: loggedInUser, guestID, loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name: user.name, email: user.email, password: user.password }));
  };

  useEffect(() => {
    if (loggedInUser) {
      // Merge guest cart after registration
      dispatch(mergeCart({ guestId: guestID })).then(() => {
        toast.success("Registered successfully!");
        // Navigate to the intended page or home
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      });
    }
  }, [loggedInUser, dispatch, guestID, navigate, location]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <div className="flex">
        <div className="flex md:w-1/2 flex-col justify-center items-center p-8 md:p-12">
          <form
            onSubmit={handleSubmit}
            action=""
            className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
          >
            <div className="flex justify-center mb-6">
              <h2 className="text-xl font-medium">E - Commerce</h2>
            </div>
            <h2 className="text-2xl font-bold text-center mb-6">Hey there!</h2>
            <p className="text-center mb-6">
              Enter you Name, email and password to register
            </p>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={user.name}
                className="w-full p-2 border rounded"
                placeholder="Enter your name"
                required
                autoComplete="name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={user.email}
                className="w-full p-2 border rounded"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={user.password}
                className="w-full p-2 border rounded"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-e-black text-white p-2 rounded font-semibold hover:bg-e-hover transation-all duration-500 disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <p className="mt-6 text-center text-sm">
              Already have an account?
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </p>
          </form>
        </div>
        <div className="hidden md:block w-1/2 bg-gray-800">
          <div className="h-full flex flex-col justify-center items-center">
            <img
              src={"https://picsum.photos/500/500?random=5"}
              alt="Register to account"
              className="h-[700px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
