"use client"
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
import Image from "next/image";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchCategories = async (slug) => {
    if (categories) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/products-categories/categories/${slug}/`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Unified handler for both mouse enter and click
  const handleShowDropdown = () => {
    setIsDropdownVisible(true);
    fetchCategories('mens'); 
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const handleCategoryClick = (categoryName, isLeaf = false, fullPath = '') => {
    if (!isLeaf) {
      console.log(`${categoryName} is not a leaf node, skipping navigation`);
      return;
    }
    
    const categorySlug = createSlug(categoryName);
    console.log('Navigating to leaf category:', categoryName, 'Slug:', categorySlug);
    
    router.push(`/products/${categorySlug}`);    
    setIsDropdownVisible(false);
  };

  const isLeafNode = (category) => {
    return !category.children || category.children.length === 0;
  };

  const createSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };

  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
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
          
          {/* Men's Link with Dropdown */}
          <div 
            className="relative"
            onMouseEnter={handleShowDropdown}
            onMouseLeave={handleMouseLeave}
            onClick={handleShowDropdown}
          >
            <Link 
              href="/mens" 
              className="hover:text-green-600 transition-colors"
              onClick={(e) => e.preventDefault()} // Prevent default link behavior
            >
              Men's
            </Link>
            
            {/* Dropdown Menu */}
            {isDropdownVisible && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-lg border rounded-md w-[800px] z-50">
                {isLoading ? (
                  <div className="p-8 text-center">Loading...</div>
                ) : categories ? (
                  <div className="p-6">
                    <div className="grid grid-cols-4 gap-8">
                      {categories.children && categories.children.map((category, index) => (
                        <div key={category.id}>
                          <h3 className="font-semibold text-gray-900 mb-4 uppercase">
                            {category.name}
                          </h3>
                          <ul className="space-y-2">
                            {category.children && category.children.length > 0 ? (
                              category.children.map((subcategory) => (
                                <li key={subcategory.id}>
                                  <button
                                    className="text-gray-600 hover:text-green-600 transition-colors block text-left w-full"
                                    onClick={() => handleCategoryClick(
                                      subcategory.name, 
                                      isLeafNode(subcategory),
                                      `${createSlug(categories.name)}/${createSlug(category.name)}/${createSlug(subcategory.name)}`
                                    )}
                                  >
                                    {subcategory.name}
                                  </button>
                                </li>
                              ))
                            ) : (
                              <li>
                                <button
                                  className="text-gray-600 hover:text-green-600 transition-colors block text-left w-full"
                                  onClick={() => handleCategoryClick(
                                    category.name, 
                                    true,
                                    `${createSlug(categories.name)}/${createSlug(category.name)}`
                                  )}
                                >
                                  View All {category.name}
                                </button>
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-red-500">Failed to load categories</div>
                )}
              </div>
            )}
          </div>
          
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