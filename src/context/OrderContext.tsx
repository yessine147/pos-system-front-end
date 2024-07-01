import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
} from "react";
import { orderReducer } from "./orderReducer";
import { OrderState } from "../types/OrderState";
import { OrderAction } from "./OrderAction";

// Define context for order state and dispatch actions
const OrderContext = createContext<
  { state: OrderState; dispatch: Dispatch<OrderAction> } | undefined
>(undefined);

// Initial state for the order context
const initialState: OrderState = {
  orderItems: [],
  totalAmount: 0,
  payment: {},
};

// Provider component to wrap around the application
export const OrderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to access the order context
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
