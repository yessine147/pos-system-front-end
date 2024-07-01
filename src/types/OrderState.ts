import { OrderItem } from "./OrderItem";
import { Payment } from "./Payment";

export interface OrderState {
  orderItems: OrderItem[];
  totalAmount: number;
  payment: Partial<Payment>;
}
