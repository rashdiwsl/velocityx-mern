import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4 flex justify-between text-white">
      <Link to="/" className="font-bold text-2xl">
        VelocityX
      </Link>
      <Link to="/garage" className="hover:text-red-500">
        My Garage
      </Link>
    </nav>
  );
};

export default Navbar;