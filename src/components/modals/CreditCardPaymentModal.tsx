import React from "react";
import { useOrder } from "../../context/OrderContext"; // Importing OrderContext to access state and dispatch
import { enqueueSnackbar } from "notistack"; // Notification utility
import { useQueryClient, useMutation } from "react-query"; // React Query hooks for data fetching and mutations
import { useNavigate } from "react-router-dom"; // Navigation hook for redirecting
import { createOrder } from "../../api/OrderApi"; // API function for creating orders

// Props interface for CreditCardPaymentModal component
interface CreditCardPaymentModalProps {
  onClose: () => void; // Function to close the modal
}

// Functional component for CreditCardPaymentModal
const CreditCardPaymentModal: React.FC<CreditCardPaymentModalProps> = ({
  onClose,
}) => {
  const { state, dispatch } = useOrder(); // Accessing state and dispatch function from OrderContext
  const queryClient = useQueryClient(); // Query client instance for invalidating queries
  const navigate = useNavigate(); // Navigation hook for redirecting after successful order creation

  // React Query mutation for creating an order
  const createOrderMutation = useMutation(createOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("orders"); // Invalidate orders query to refetch data

      navigate("/home"); // Navigate to home page after successful order creation

      enqueueSnackbar("Order created successfully", { variant: "success" }); // Display success notification
    },
    onError: () => {
      enqueueSnackbar("Error creating order", { variant: "error" }); // Display error notification if order creation fails
    },
  });

  // Handle form submission for creating a credit card payment order
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.currentTarget); // Get form data
    const paymentData = {
      payment_method: "credit card", // Payment method (credit card in this case)
      cardNumber: formData.get("cardNumber") as string, // Card details from form input
      cardHolderName: formData.get("cardHolderName") as string,
      expirationDate: formData.get("expirationDate") as string,
      receiptNumber: null, // No receipt number for credit card payment
    };
    let newState = { ...state, payment: paymentData }; // Create new state with updated payment data
    dispatch({ type: "ADD_PAYMENT", payload: paymentData }); // Dispatch action to add payment data to state

    try {
      await createOrderMutation.mutateAsync(newState); // Call mutation to create the order asynchronously
    } catch (error) {
      console.error("Error creating order:", error); // Log error if order creation fails
    }

    dispatch({ type: "CLEAR_ORDER" }); // Clear order state after order creation
    onClose(); // Close the modal
  };

  // Prevent propagation of click events within the modal content
  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
        onClick={stopPropagation}
      >
        <h2 className="text-xl font-bold mb-4">Credit Card Payment</h2>
        {/* Form for submitting credit card payment details */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Card Number
            </label>
            {/* Input field for entering card number */}
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="cardHolderName"
              className="block text-sm font-medium text-gray-700"
            >
              Cardholder Name
            </label>
            {/* Input field for entering cardholder name */}
            <input
              type="text"
              id="cardHolderName"
              name="cardHolderName"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="expirationDate"
              className="block text-sm font-medium text-gray-700"
            >
              Expiration Date
            </label>
            {/* Input field for entering expiration date */}
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          {/* Submit and cancel buttons */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreditCardPaymentModal;
