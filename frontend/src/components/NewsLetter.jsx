import React from 'react'
import { Button } from "@/components/ui/button";



const NewsLetter = () => {
  return (
    <div>
        
        {/* Newsletter Section */}
        <section className="bg-gray-900 text-white py-16 my-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4">Stay in Style</h2>
            <p className="text-gray-300 mb-8">Get the latest fashion trends and exclusive offers delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white bg-white"
              />
              <Button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-5 rounded-lg font-medium">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
    </div>
  )
}

export default NewsLetter