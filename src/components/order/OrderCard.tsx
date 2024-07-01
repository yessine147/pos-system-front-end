import React from 'react';
import { Order } from '../../api/OrderApi';

const OrderCard = ( order : Order ) => {
  return (
    <div className="order-card p-4 border rounded-lg shadow-sm">
      <p className="font-bold">Order ID: {order.id}</p>
      <p>Total Amount: ${order.totalAmount}</p>
      <p>Date: {new Date(order.orderDateTime).toLocaleDateString()}</p>
    </div>
  );
};

export default OrderCard;
