import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {

  return (
    <>
      <GlobalStyles />
      <DarkModeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Base />} >
              <Route index element={<Home />}/>
              <Route path=":productID" element={<Product />}/>
            </Route>
            <Route path="/login" element={<LoginAndSignup loginOrSignup="login"/>} />
            <Route path="/signup" element={<LoginAndSignup loginOrSignup="signup"/>} />
            <Route path="/user" element={<Base userType="customer" />}>
              <Route index element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path=":productID" element={<Product />}/>
            </Route>
            <Route path="/store" element={<Base userType="seller" />}>
              <Route index element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="add" element={<EditProduct editOrAdd="edit" />}/>
              <Route path=":productID" element={<Product />}/>
              <Route path=":productID/edit" element={<EditProduct editOrAdd="add" />}/>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    </>
  );
}

export default App;
