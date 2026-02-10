import React, { useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/slices/CartSlice";

const UserLayout = () => {
  const dispatch = useDispatch();
  const { user, guestID } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch cart on app load
    dispatch(fetchCart({ userId: user?.id, guestId: guestID }));
  }, [dispatch, user, guestID]);

  return (
    <>
      {/*Header Section*/}
      <Header />
      {/*Main Content Section*/}
      <main>
        {/* Inner Components */}
        <Outlet />
      </main>
      {/*Footer Section*/}
      <Footer />
    </>
  );
};

export default UserLayout;
