export interface Payment {
  payment_method: string;
  receiptNumber: string | null;
  cardNumber: string | null;
  cardHolderName: string | null;
  expirationDate: string | null;
}
