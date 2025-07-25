import React from "react";
import products from "../../../../data/products.json";
import ProductImages from '@/components/ProductImages';

const ProductDetailPage = ({ params }) => {
  const product = products.find((p) => p.id.toString() === params.id);

  if (!product) {
    return <div className="p-8">Product not found.</div>;
  }

  return (
    <>
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
        {/* IMG */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductImages />
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          {/* Price and Rating */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold">${product.price}</span>
            <div className="flex items-center">
              <span className="text-yellow-500">★★★★☆</span>
              <span className="text-gray-500 ml-2">({product.reviewCount})</span>
            </div>
          </div>
          
          {/* Description */}
          <div className="mt-4">
            <p className="text-gray-700">{product.description}</p>
          </div>
          
    
          
          {/* Color Options */}
          {product.colors && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Colors</h2>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button 
                    key={color}
                    className="w-8 h-8 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                    aria-label={color}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Size Options */}
          {product.sizes && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Size</h2>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button 
                    key={size}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Add to Cart Button */}
          <button className="mt-8 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors">
            Add to Cart
          </button>
          
          {/* Additional Info */}
          <div className="mt-8 border-t pt-4">
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              
             
              <div className="flex justify-between">
                <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;