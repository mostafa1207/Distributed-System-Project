import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Base from "./routes/Base";
import LoginAndSignup from "./routes/LoginAndSignup";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Cart from "./routes/Cart";
import Checkout from "./routes/Checkout";
import Product from "./routes/Product";
import EditProduct from "./routes/EditProduct";
import PageNotFound from "./pages/PageNotFound";
import { DarkModeProvider } from "./context/DarkModeContext";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 0,
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Base />}>
              <Route index element={<Home />} />
              <Route path="product/:productId" element={<Product />} />
            </Route>
            <Route
              path="/login"
              element={<LoginAndSignup loginOrSignup="login" />}
            />
            <Route
              path="/signup"
              element={<LoginAndSignup loginOrSignup="signup" />}
            />
            <Route path="/user" element={<Base userType="customer" />}>
              <Route index element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="product/:productId" element={<Product />} />
            </Route>
            <Route path="/store" element={<Base userType="seller" />}>
              <Route index element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="add" element={<EditProduct editOrAdd="add" />} />
              <Route path="product/:productId" element={<Product />} />
              <Route
                path="product/:productId/edit"
                element={<EditProduct editOrAdd="edit" />}
              />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
