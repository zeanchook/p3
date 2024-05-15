import debug from "debug";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
// import NewOrderPage from "../NewOrderPage/NewOrderPage";
// import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";

import ProductDetailsPage from "../ProductDetailPage/ProductDetailsPage";
import CartCheckOut from "../CartCheckout/CartCheckOut";
import CheckOutPage from "../CheckoutPage/CheckOutPage";

import { createContext } from "react";
export const DataContext = createContext();

const log = debug("mern:pages:App:App");

function App() {
  const [user, setUser] = useState(getUser());

  log("user %o", user);
  console.log(user)
  if (!user) {
    return (
      <main className="App">
          <NavBar />
          <AuthPage setUser={setUser} />
      </main>
    );
  }

  return (
    <>
      {/* replace if possible */}
      <DataContext.Provider value={user}>
      <main className="App">
        <NavBar />

        <Routes>
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/user/:name/:orderid/cart" element={<CartCheckOut />} />
          <Route path="/user/:name/:orderid/checkout" element={<CheckOutPage />} />
        </Routes>
      </main>
      </DataContext.Provider>
    </>
  );
}

export default App;

