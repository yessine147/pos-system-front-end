import React from "react";
import { OrderItem } from "../../types/OrderItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

// Props interface for OrderItemCard component
interface OrderItemCardProps {
  orderItem: OrderItem; // Represents the order item to display
  onRemove: () => void; // Callback function to remove the order item
  onIncrease: () => void; // Callback function to increase the quantity of the order item
  onDecrease: () => void; // Callback function to decrease the quantity of the order item
}

// Functional component to display an order item card
const OrderItemCard: React.FC<OrderItemCardProps> = ({
  orderItem,
  onDecrease,
  onIncrease,
  onRemove,
}) => {
  return (
    <div className="flex items-center mb-4 border p-4 rounded-lg shadow-sm">
      <img
        src={orderItem.article.image}
        alt={orderItem.article.name}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex flex-col ml-4 flex-grow">
        <span className="text-lg font-bold">{orderItem.article.name}</span>
        <span className="text-gray-600">
          ${orderItem.article.price.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center">
        <button
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300"
          onClick={onDecrease}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <span className="mx-4 text-lg">{orderItem.quantity}</span>
        <button
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300"
          onClick={onIncrease}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
          className="ml-4 text-red-500 hover:text-red-700"
          onClick={onRemove}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
};

export default OrderItemCard;
