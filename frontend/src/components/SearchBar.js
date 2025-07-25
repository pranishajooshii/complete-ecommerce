"use client";

import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push(`/list?name=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1"
    >
      <input
        type="text"
        name="name"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 bg-transparent outline-none"
      />
      <button type="submit" className="cursor-pointer">
        <IoIosSearch size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
