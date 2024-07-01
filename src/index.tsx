import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { OrderProvider } from "./context/OrderContext"; // Import the OrderProvider
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <OrderProvider>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </OrderProvider>
  </QueryClientProvider>
);
