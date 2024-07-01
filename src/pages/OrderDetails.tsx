import { getOrderById } from "../api/OrderApi";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  // Fetch orderId from URL parameters
  const { orderId } = useParams<{ orderId: string }>();

  // Fetch order details using useQuery from react-query
  const { data, error, isLoading } = useQuery(["order", orderId], () =>
    getOrderById(orderId as string)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading order details</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <header className="mb-4 text-center">
          <h1 className="text-2xl font-bold">Your Store</h1>
          <p className="text-sm">
            Order Date:{" "}
            {new Date(data?.orderDateTime as Date).toLocaleDateString()}
          </p>
        </header>
        <section className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Order Items</h2>
          <ul>
            {data?.orderItems.map((item) => (
              <li key={item.article.id} className="flex justify-between mb-1">
                <span>
                  {item.article.name} x {item.quantity}
                </span>
                <span>${(item.article.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </section>
        <footer className="border-t pt-4">
          <p className="mb-1">
            <strong>Total Amount:</strong> ${data?.totalAmount.toFixed(2)}
          </p>
          <p className="mb-1">
            <strong>Payment Method:</strong> {data?.payment.payment_method}
          </p>
          {data?.payment.payment_method === "credit card" && (
            <>
              <p className="mb-1">
                <strong>Card Number:</strong> {data?.payment.cardNumber}
              </p>
              <p className="mb-1">
                <strong>Card Holder Name:</strong>{" "}
                {data?.payment.cardHolderName}
              </p>
              <p className="mb-1">
                <strong>Expiration Date:</strong> {data?.payment.expirationDate}
              </p>
            </>
          )}
          {data?.payment.payment_method === "check" && (
            <p className="mb-1">
              <strong>Receipt Number:</strong> {data?.payment.receiptNumber}
            </p>
          )}
        </footer>
      </div>
    </div>
  );
};

export default OrderDetail;
