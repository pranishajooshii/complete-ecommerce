// app/products/[subcategory]/page.js
"use client"
import React, { useState, useEffect } from "react";
import ProductList from "../../../components/ProductList";
import axios from 'axios';

const SubcategoryPage = ({ params }) => {
  // Unwrap the params promise
  const { subcategory } = React.use(params);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      if (!subcategory) return;

      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching products for subcategory:', subcategory);
        const response = await axios.get(
          `http://127.0.0.1:8000/api/products-categories/categories/${subcategory}/get_products/`
        );
        
        console.log('API Response:', response.data);
        setProducts(response.data || []);
        
        // Convert slug back to readable name for display
        const readableName = subcategory
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        setCategoryName(readableName);
        
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.response?.data?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subcategory]);  // Changed dependency from params.subcategory to subcategory

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      

      {/* Products Grid */}
      <ProductList 
        products={products} 
        title={`${categoryName} Collection`}
      />
    </div>
  );
};

export default SubcategoryPage;