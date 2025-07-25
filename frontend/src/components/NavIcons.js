"use client";

import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import CardModal from "./CardModal";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const router = useRouter();

  const isLoggedIn = false; // Need to replace with actual authentication logic
  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    }
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 relative z-50">
        {/* User Icon  */}
        <FiUser size={20} className="cursor-pointer" onClick={handleProfile} />

        {/* Profile Dropdown */}
        {isProfileOpen && (
          <div className="flex flex-col w-[150px] gap-2 absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 border border-gray-200 z-20">
            <Link
              href="/profile"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              <FaRegUser size={16} />
              Profile
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer">
              <FiLogOut size={16} />
              Logout
            </div>
          </div>
        )}

        <div className="relative cursor-pointer ">
          <BsCart2
            size={20}
            className=""
            onClick={() => setIsCartOpen((prev) => !prev)}
          />
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-red-400 rounded-full text-white text-sm flex justify-center items-center">2</div>
          {isCartOpen && <CardModal />}
        </div>

        <IoMdNotificationsOutline size={20} />
      </div>
    </>
  );
};

export default NavIcons;
