import { Article } from "../types/Article";
import { Payment } from "../types/Payment";

export type OrderAction =
  | { type: "ADD_ARTICLE"; payload: Article } // Action to add an article to the order
  | { type: "REMOVE_ARTICLE"; payload: number } // Action to remove an article from the order by its index or ID
  | { type: "CLEAR_ORDER" } // Action to clear all articles from the order
  | { type: "ADD_PAYMENT"; payload: Payment } // Action to add payment details to the order
  | { type: "DECREASE_QUANTITY"; payload: number }; // Action to decrease the quantity of a specific article in the order
