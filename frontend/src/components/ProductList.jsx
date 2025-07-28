// components/ProductList.js
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products = [], title = "New Arrivals" }) => {
  // Handle case where products might be null or undefined
  const displayProducts = Array.isArray(products) ? products : [];

  if (displayProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
        <h2 className="text-3xl font-bold  mt-16 mb-10">
          {title}
        </h2>
        <p className="text-gray-600 text-lg">No products available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-center mt-16 mb-10">
        {title}
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
          {displayProducts.map((product, index) => (
            <ProductCard 
              key={product.id || product.pk || index} 
              product={product} 
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;