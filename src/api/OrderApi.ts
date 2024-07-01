import axios, { AxiosResponse } from "axios";
import { OrderItem } from "../types/OrderItem";
import { Payment } from "../types/Payment";

// Base URL for the API
const BASE_URL = "http://localhost:3000";

// Create Axios instance with base URL
const api = axios.create({
  baseURL: BASE_URL,
});

// Interface for defining the structure of an Order
export interface Order {
  id: string;
  orderDateTime: Date;
  orderItems: OrderItem[];
  totalAmount: number;
  payment: Payment;
}

// Function to fetch all orders from the API
export const getAllOrders = async (): Promise<Order[]> => {
  const response: AxiosResponse<Order[]> = await api.get("/orders");
  return response.data;
};

// Function to fetch a specific order by its ID from the API
export const getOrderById = async (id: string): Promise<Order> => {
  const response: AxiosResponse<Order> = await api.get(`/orders/${id}`);
  return response.data;
};

// Function to create a new order by posting the order data to the API
export const createOrder = async (order: Partial<Order>): Promise<Order> => {
  const response: AxiosResponse<Order> = await api.post("/orders", order);
  return response.data;
};
