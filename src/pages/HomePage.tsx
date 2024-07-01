import { useOrder } from "../context/OrderContext";
import MainContainer from "../components/home/MainContainer";
import OrderSummary from "../components/order/OrderSummary";

const HomePage = () => {
  const { state } = useOrder();

  return (
    <div className="flex flex-grow">
      <div
        className={`p-4 ${state.orderItems.length !== 0 ? "w-2/3" : "w-full"}`}
      >
        <MainContainer />
      </div>
      {state.orderItems.length !== 0 && <OrderSummary />}
    </div>
  );
};

export default HomePage;
