import React from 'react'

const Footer = () => {
  return (
    <div>
       {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">JOSHI</h3>
              <p className="text-gray-600 text-sm">Your destination for the latest fashion trends and timeless styles.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">New Arrivals</a></li>
                <li><a href="#" className="hover:text-gray-900">Women</a></li>
                <li><a href="#" className="hover:text-gray-900">Men</a></li>
                <li><a href="#" className="hover:text-gray-900">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Help</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Customer Service</a></li>
                <li><a href="#" className="hover:text-gray-900">Size Guide</a></li>
                <li><a href="#" className="hover:text-gray-900">Returns</a></li>
                <li><a href="#" className="hover:text-gray-900">Shipping</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Instagram</a></li>
                <li><a href="#" className="hover:text-gray-900">Facebook</a></li>
                <li><a href="#" className="hover:text-gray-900">Twitter</a></li>
                <li><a href="#" className="hover:text-gray-900">Pinterest</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2025 JOSHI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer