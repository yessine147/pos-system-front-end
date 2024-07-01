import { OrderState } from "../types/OrderState";
import { OrderAction } from "./OrderAction";

// Initial state for the order
const initialState: OrderState = {
  orderItems: [],
  totalAmount: 0,
  payment: {},
};

// Reducer function to manage state transitions based on actions
export const orderReducer = (
  state: OrderState = initialState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
    case "ADD_ARTICLE":
      // Check if the article is already in the order
      const existingItemIndex = state.orderItems.findIndex(
        (item) => item.article.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        // If article exists, increase its quantity
        const updatedOrderItems = [...state.orderItems];
        updatedOrderItems[existingItemIndex].quantity++;
        return {
          ...state,
          orderItems: updatedOrderItems,
          totalAmount: state.totalAmount + action.payload.price,
        };
      } else {
        // If article doesn't exist, add it to the order with quantity 1
        return {
          ...state,
          orderItems: [
            ...state.orderItems,
            { article: action.payload, quantity: 1 },
          ],
          totalAmount: state.totalAmount + action.payload.price,
        };
      }
    case "REMOVE_ARTICLE":
      // Remove article from order
      const filteredItems = state.orderItems.filter(
        (item) => item.article.id !== action.payload
      );
      const removedItem = state.orderItems.find(
        (item) => item.article.id === action.payload
      );
      return {
        ...state,
        orderItems: filteredItems,
        totalAmount:
          state.totalAmount -
          removedItem!.article.price * removedItem!.quantity,
      };
    case "DECREASE_QUANTITY":
      // Decrease quantity of a specific article in the order
      const itemIndex = state.orderItems.findIndex(
        (item) => item.article.id === action.payload
      );
      if (state.orderItems[itemIndex].quantity > 1) {
        // If quantity is more than 1, decrease it
        const updatedItems = [...state.orderItems];
        updatedItems[itemIndex].quantity--;
        return {
          ...state,
          orderItems: updatedItems,
          totalAmount:
            state.totalAmount - updatedItems[itemIndex].article.price,
        };
      } else {
        // If quantity is 1, remove the article from the order
        return {
          ...state,
          orderItems: state.orderItems.filter(
            (item) => item.article.id !== action.payload
          ),
          totalAmount:
            state.totalAmount - state.orderItems[itemIndex].article.price,
        };
      }
    case "CLEAR_ORDER":
      // Clear the entire order
      return initialState;
    case "ADD_PAYMENT":
      // Add payment details to the order
      return {
        ...state,
        payment: action.payload,
      };
    default:
      // Return current state for unrecognized actions
      return state;
  }
};

export default orderReducer;
