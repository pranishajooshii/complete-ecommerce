"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import products from "../../data/products.json"; 
import { useState } from "react";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }) => {
 

  return (
    <div
      className="relative w-full h-[500px] bg-white rounded-sm overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
      
    >
      <Link href={`/products/${product.id}`} className="block h-full">
        {/* Image Section */}
        <div className="h-96 w-full relative">
          <Image
            src={product.image}
            alt="Product Image"
            fill
            className="object-cover"
          />
        </div>

        {/* Description Section */}
        <div className="h-[calc(500px-384px)] p-4 bg-gray-100">
          {/* 384px = h-96 (image height) */}
          <h3 className="text-lg font-semibold">{product.productName}</h3>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
          <div className="flex justify-end items-end ">
            <button className=" border border-black text-gray-900 px-4 py-2 rounded-full  ">
              Add to cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
