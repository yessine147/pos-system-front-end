import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillCreditCard } from "react-icons/ai";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { IoIosCash } from "react-icons/io";
import CheckPaymentModal from "../components/modals/CheckPaymentModal";
import CreditCardPaymentModal from "../components/modals/CreditCardPaymentModal";
import { enqueueSnackbar } from "notistack";
import { useQueryClient, useMutation } from "react-query";
import { createOrder } from "../api/OrderApi";
import { useOrder } from "../context/OrderContext";

/**
 * PaymentPage component allows users to select a payment method.
 * Displays modals for credit card and check payments.
 * Creates an order with selected payment method.
 */
const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [paymentModal, setPaymentModal] = useState<string | null>(null);
  const { state, dispatch } = useOrder();
  const queryClient = useQueryClient();

  const createOrderMutation = useMutation(createOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
      navigate("/home");
      enqueueSnackbar("Order created successfully", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("Error creating order", { variant: "error" });
    },
  });

  /**
   * Closes the payment modal.
   */
  const handleCloseModal = () => {
    setPaymentModal(null);
  };

  /**
   * Handles payment with cash method.
   * Dispatches the payment data and creates the order.
   */
  const payWithCash = async () => {
    const paymentData = {
      payment_method: "cash",
      cardNumber: null,
      cardHolderName: null,
      expirationDate: null,
      receiptNumber: null,
    };

    let newState = { ...state, payment: paymentData };
    dispatch({ type: "ADD_PAYMENT", payload: paymentData });

    try {
      await createOrderMutation.mutateAsync(newState);
    } catch (error) {
      console.error("Error creating order:", error);
    }
    dispatch({ type: "CLEAR_ORDER" });
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <h2 className="text-4xl font-bold mb-8 text-blue-600">
          Select Payment Method
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <div
            className="flex flex-col items-center p-10 bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-2xl transition-shadow"
            onClick={() => payWithCash()}
          >
            <IoIosCash className="text-6xl mb-4 text-green-500" />
            <h3 className="text-2xl font-semibold text-gray-800">Cash</h3>
          </div>
          <div
            className="flex flex-col items-center p-10 bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-2xl transition-shadow"
            onClick={() => setPaymentModal("creditCard")}
          >
            <AiFillCreditCard className="text-6xl mb-4 text-blue-500" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Credit Card
            </h3>
          </div>
          <div
            className="flex flex-col items-center p-10 bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-2xl transition-shadow"
            onClick={() => setPaymentModal("check")}
          >
            <FaMoneyCheckAlt className="text-6xl mb-4 text-purple-500" />
            <h3 className="text-2xl font-semibold text-gray-800">Check</h3>
          </div>
        </div>
        <button
          className="mt-8 bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => navigate(-1)}
        >
          Back to Order
        </button>
      </div>
      {paymentModal === "creditCard" && (
        <CreditCardPaymentModal onClose={handleCloseModal} />
      )}
      {paymentModal === "check" && (
        <CheckPaymentModal onClose={handleCloseModal} />
      )}
    </>
  );
};

export default PaymentPage;
