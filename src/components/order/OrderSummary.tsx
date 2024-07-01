import React from 'react';
import { useOrder } from '../../context/OrderContext';
import OrderItemCard from './OrderItemCard';
import { Article } from '../../types/Article';

import { TiShoppingCart } from 'react-icons/ti';
import { BsTrash3 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

// Functional component for Order Summary
const OrderSummary: React.FC = () => {
  // Accessing state and dispatch function from OrderContext
  const { state, dispatch } = useOrder();
  // Hook for navigation
  const navigate = useNavigate();

  // Remove article from order
  const handleRemove = (id: number) => {
    dispatch({ type: 'REMOVE_ARTICLE', payload: id });
  };

  // Add article to order
  const handleIncrease = (article: Article) => {
    dispatch({ type: 'ADD_ARTICLE', payload: article });
  };

  // Decrease quantity of article in order
  const handleDecrease = (id: number) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  };

  // Navigate to payment page
  const handlePaymentClick = () => {
    navigate('/payment');
  };

  return (
    <div>
      {/* Top section with shopping cart icon and clear order button */}
      <div className="flex justify-between items-center bg-gray-200 p-4 mt-4 rounded-t-lg shadow">
        <div className="flex items-center relative">
          <TiShoppingCart className="text-2xl" />
          {/* Display total number of items in the order */}
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {state.orderItems.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </div>
        {/* Button to clear the entire order */}
        <button
          className="flex items-center bg-red-500 text-white p-2 rounded"
          onClick={() => dispatch({ type: 'CLEAR_ORDER' })}
        >
          <BsTrash3 className="mr-1" /> Clear Order
        </button>
      </div>
      {/* Main section displaying order items and total amount */}
      <div className="p-4 bg-white shadow rounded-b-lg">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        {/* Conditional rendering based on whether there are items in the order */}
        {state.orderItems.length === 0 ? (
          <p>No articles in your order.</p>
        ) : (
          <ul>
            {/* Mapping through order items to display each OrderItemCard */}
            {state.orderItems.map((orderItem) => (
              <OrderItemCard
                key={orderItem.article.id}
                orderItem={orderItem}
                onRemove={() => handleRemove(orderItem.article.id)}
                onIncrease={() => handleIncrease(orderItem.article)}
                onDecrease={() => handleDecrease(orderItem.article.id)}
              />
            ))}
          </ul>
        )}
        {/* Display total amount of the order */}
        <p className="text-lg font-bold mt-4">Total Amount: ${state.totalAmount.toFixed(2)}</p>
        {/* Button to proceed to payment */}
        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded" onClick={handlePaymentClick}>
          Payment
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
