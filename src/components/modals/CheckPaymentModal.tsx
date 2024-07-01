import { enqueueSnackbar } from "notistack";
import React from "react";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../api/OrderApi";
import { useOrder } from "../../context/OrderContext";

// Props interface for CheckPaymentModal component
interface CheckPaymentModalProps {
  onClose: () => void; // Function to close the modal
}

// Functional component for CheckPaymentModal
const CheckPaymentModal: React.FC<CheckPaymentModalProps> = ({ onClose }) => {
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

  // Handle form submission for creating a check payment order
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.currentTarget); // Get form data
    const paymentData = {
      payment_method: "check", // Payment method (check in this case)
      cardNumber: null, // No card details for check payment
      cardHolderName: null,
      expirationDate: null,
      receiptNumber: formData.get("receiptNumber") as string, // Receipt number from form input
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
      onClick={onClose} // Close modal on overlay click
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
        onClick={stopPropagation} // Prevent closing modal when clicking inside
      >
        <h2 className="text-xl font-bold mb-4">Check Payment</h2>
        {/* Form for submitting check payment details */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="receiptNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Receipt Number
            </label>
            {/* Input field for entering receipt number */}
            <input
              type="text"
              id="receiptNumber"
              name="receiptNumber"
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
            onClick={onClose} // Close modal on cancel button click
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckPaymentModal;
