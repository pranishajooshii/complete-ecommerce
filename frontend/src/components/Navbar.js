import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* MOBILE */}
      <div className="md:hidden flex items-center justify-between h-full">
        <Link href="/" className="text-2xl tracking-wide">
          JOSHI
        </Link>
        <Menu />
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex items-center justify-between h-full">
        {/* Left - Logo and JOSHI */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <div className="text-2xl tracking-wide">JOSHI</div>
          </Link>
        </div>

        {/* Center - Middle Links */}
        <div className="flex-1 flex justify-center items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/men">Men's</Link>
          <Link href="/women">Women's</Link>
          <Link href="/kids">Kids</Link>
        </div>

        {/* Right - Search + Icons */}
        <div className="flex items-center gap-6">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
