import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const cartItemCount = cart?.products?.reduce((total, item) => total + item.quantity, 0) || 0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };
  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    // Nav Bar Section
    <>
      <nav className="container mx-auto flex item-center justify-between py-4 px-6">
        {/* Left - Logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            E - Commerce
          </Link>
        </div>
        {/* Center - Navbar */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collections"
            className="text-e-black hover:text-e-hover text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="#"
            className="text-e-black hover:text-e-hover text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="#"
            className="text-e-black hover:text-e-hover text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="#"
            className="text-e-black hover:text-e-hover text-sm font-medium uppercase"
          >
            bottom Wear
          </Link>
        </div>
        {/* Right - Icons */}
        <div className="flex item-center space-x-4">
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-md hover:from-gray-700 hover:to-gray-800 hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Admin Panel
            </Link>
          )}

          <Link to="/profile" className="text-e-black ">
            <HiOutlineUser className="h-6 w-6 mt-1 text-e-black hover:text-e-hover" />
          </Link>
          <button
            onClick={toggleCartDrawer}
            className="relative  text-e-black hover:text-e-hover"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-e-black hover:text-e-hover" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 bg-e-black text-white text-xs rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>
          {/* Search */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-e-black hover:text-e-hover" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0  w-3/4 sm:w-1/2 md"w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-e-black hover:text-e-hover" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">
            <nav className="space-y-4">
              <Link
                to="/collections"
                className="block hover:text-e-hover text-e-black"
                onClick={toggleNavDrawer}
              >
                Men
              </Link>
              <Link
                to="#"
                className="block hover:text-e-hover text-e-black"
                onClick={toggleNavDrawer}
              >
                Top Wear
              </Link>
              <Link
                to="#"
                className="block hover:text-e-hover text-e-black"
                onClick={toggleNavDrawer}
              >
                Bottom Wear
              </Link>
              <Link
                to="#"
                className="block  text-e-black hover:text-[#ffcc34]"
                onClick={toggleNavDrawer}
              >
                Women
              </Link>
            </nav>
          </h2>
        </div>
      </div>
    </>
  );
};

export default Navbar;
