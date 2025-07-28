"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <div className="relative w-full h-[500px] bg-white rounded-sm overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer">
      <Link href={`/products/${product.id}`} className="block h-full">
        {/* Image Section */}
        <div className="h-96 w-full relative">
          <Image
            src={product.image || product.images?.[0] || '/placeholder-product.jpg'}
            alt={product.name || product.productName || 'Product Image'}
            fill
            className="object-cover"
          />
        </div>

        {/* Description Section */}
        <div className="h-[calc(500px-384px)] p-4 bg-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold line-clamp-2">
              {product.name || product.productName || 'Product Name'}
            </h3>
            <p className="text-gray-600">
              ${(product.price || 0).toFixed ? (product.price || 0).toFixed(2) : product.price || '0.00'}
            </p>
          </div>
          <div className="flex justify-end items-end">
            <button 
              className="border border-black text-gray-900 px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic here
                console.log('Added to cart:', product);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;