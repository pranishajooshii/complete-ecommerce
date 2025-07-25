"use client";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";

const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-50">
      {/* Hamburger Icon */}
      <div className="cursor-pointer p-2">
        <GiHamburgerMenu
          size={30}
          className="text-gray-800 hover:text-blue-600 transition-colors duration-200"
          onClick={() => setOpen((prev) => !prev)}
        />
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-14 right-0 w-full bg-white shadow-lg rounded-lg border border-gray-200">
          <ul className="flex flex-col p-4 space-y-3">
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block text-gray-800 hover:text-blue-600 transition-colors duration-150"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block text-gray-800 hover:text-blue-600 transition-colors duration-150"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/list"
                onClick={() => setOpen(false)}
                className="block text-gray-800 hover:text-blue-600 transition-colors duration-150"
              >
                List
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
