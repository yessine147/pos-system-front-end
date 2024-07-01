import React from "react";
import { useQuery } from "react-query";
import { getAllOrders } from "../api/OrderApi";
import { useNavigate } from "react-router-dom";

/**
 * OrdersPage component fetches and displays a list of all orders.
 * Users can click on an order to view its details.
 */
const OrdersPage: React.FC = () => {
  const { data, error, isLoading } = useQuery("orders", getAllOrders);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading orders</div>;
  if (data?.length === 0) return <div>No Orders in your history.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="space-y-4">
        {data?.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            <h3 className="text-lg font-semibold mb-2">Order ID: {order.id}</h3>
            <p className="mb-1">
              <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
            </p>
            <p className="mb-1">
              <strong>Date:</strong>{" "}
              {new Date(order.orderDateTime).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
