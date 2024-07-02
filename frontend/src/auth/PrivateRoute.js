import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/header/Header"; // Adjust the import path as necessary

const PrivateRoute = () => {
  const isLoggedIn = document?.cookie && document?.cookie === "cache-x=true";
  return isLoggedIn ? (
    <div>
      <Header />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoute;
