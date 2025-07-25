import React from "react";
import ProductCard from "./ProductCard";
import products from "../../data/products.json";
const ProductList = () => {
  return (
    <>
      <h2 className="text-3xl font-bold text-center mt-16 mb-10">
        New Arrivals
      </h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 ">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
