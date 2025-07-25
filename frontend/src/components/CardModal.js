import React, { useState } from 'react'
import Image from 'next/image'

const CardModal = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Sample Product',
      img: '/sample-product.jpg',
      price: 29.99,
      quantity: 2,
    },
    {
      id: '2',
      name: 'Another Product',
      img: '/sample-product2.jpg',
      price: 19.99,
      quantity: 1,
    },
  ])

  

  

  return (
    <div className='absolute w-80 rounded-md bg-white top-12 right-4 p-4 shadow-lg border border-gray-200 z-50'>
      <h3 className='font-bold text-lg mb-4'>Your Cart</h3>
      
      {cartItems.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-8'>
          <div className='relative w-24 h-24 mb-4'>
            <Image
              src="/empty-cart.svg"
              alt="Empty cart"
              fill
              className='object-contain'
            />
          </div>
          <p className='text-gray-500'>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className='max-h-60 overflow-y-auto mb-4 space-y-4'>
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-2 border-b border-gray-100">
                {/* Product Image and Info */}
                <div className="flex items-center">
                  <div className="relative w-16 h-16 mr-3">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-900">{item.name}</h3>
                    <p className="text-xs text-gray-600">${item.price.toFixed(2)} each</p>
                  </div>
                </div>

                {/* Quantity Controls and Price */}
                <div className="flex items-center">
                  <div className="flex items-center mr-3">
                    <button
                      className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-l hover:bg-gray-100 text-xs"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 h-6 flex items-center justify-center border-t border-b border-gray-300 text-xs">
                      {item.quantity}
                    </span>
                    <button
                      className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-r hover:bg-gray-100 text-xs"
                    >
                      +
                    </button>
                  </div>

                  {/* Total Price and Remove Button */}
                  <div className="flex flex-col items-end">
                    <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='border-t border-gray-200 pt-4'>
            <div className='flex justify-between mb-4'>
              <span className='font-semibold'>Subtotal:</span>
            </div>
            
            <button className='w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700 transition'>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CardModal