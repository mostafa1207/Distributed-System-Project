import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from "./routes/Base";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Cart from "./routes/Cart";
import Login from "./routes/Login";
import { DarkModeProvider } from "./context/DarkModeContext";
import "./App.css";

function App() {
  // const [message, setMessage] = useState(null);
  // const handler = () => {
  //   fetch("https://distributed-system-project.onrender.com/helloWorldButton")
  //     .then((response) => response.text())
  //     .then((data) => {
  //       setMessage(data);
  //     });
  // };

  return (
    <>
      <GlobalStyles />
      <DarkModeProvider>
        <BrowserRouter>
          <Routes>
            <Route path=":loginOrSignup" element={<Login />} />
            <Route path="/" element={<Base userType="customer" />}>
              <Route index element={<Home userType="customer" />} />
              <Route
                path="profile"
                element={<Profile userType="customer" />}
              ></Route>
              <Route path="cart" element={<Cart />}></Route>
            </Route>
            <Route path="/store" element={<Base userType="seller" />}>
              <Route index element={<Home userType="seller" />} />
              <Route
                path="profile"
                element={<Profile userType="seller" />}
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    </>
  );
}

export default App;
