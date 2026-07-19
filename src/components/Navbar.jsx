import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-5 flex justify-center gap-10">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-xl font-semibold transition ${
              isActive
                ? "text-blue-500"
                : "text-white hover:text-blue-400"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `text-xl font-semibold transition ${
              isActive
                ? "text-blue-500"
                : "text-white hover:text-blue-400"
            }`
          }
        >
          Notes
        </NavLink>

      </div>
    </nav>
  );
};

export default Navbar;