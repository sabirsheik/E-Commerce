import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlices";
import { mergeCart } from "../redux/slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
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
    dispatch(loginUser({ email: user.email, password: user.password }));
  };

  useEffect(() => {
    if (loggedInUser) {
      // Merge guest cart after login
      dispatch(mergeCart({ guestId: guestID })).then(() => {
        toast.success("Logged in successfully!");
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
              Enter your username and password to login
            </p>
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
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="mt-6 text-center text-sm">
              Don't have an account?
              <Link to="/register" className="text-blue-600">
                Register
              </Link>
            </p>
          </form>
        </div>
        <div className="hidden md:block w-1/2 bg-gray-800">
          <div className="h-full flex flex-col justify-center items-center">
            <img
              src={"https://picsum.photos/500/500?random=5"}
              alt="Login to account"
              className="h-[575px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
