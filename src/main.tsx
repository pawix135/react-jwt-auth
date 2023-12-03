import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AuthProvider from "./components/AuthProvider/index.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import "./global.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </QueryClientProvider>
);
