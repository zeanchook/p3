import debug from 'debug';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../../components/NavBar/';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
// import NewOrderPage from "../NewOrderPage/NewOrderPage";
// import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import HomePage from '../HomePage/HomePage';
import ProductListingPage from "../ProductListingPage/ProductListingPage"
import ProductDetailsPage from '../ProductDetailPage/ProductDetailsPage';
import CartCheckOut from '../CartCheckout/CartCheckOut';
import CheckOutPage from '../CheckoutPage/CheckOutPage';

import { createContext } from 'react';
export const DataContext = createContext();

const log = debug('mern:pages:App:App');

function App() {
	const [user, setUser] = useState(getUser());

	log('user %o', user);
	
  const MainAuth = () => {
	if (!user) {
		return (
			<main className="App">
				<AuthPage setUser={setUser} />
			</main>
		);
	}
  else{
    return (
    <Routes>
      <Route path="/home" element={<HomePage />}/>
      <Route path="/products" element={<ProductListingPage />}/>
      <Route path="/product/:productId" element={<ProductDetailsPage />}/>
      <Route path="/user/cart" element={<CartCheckOut />} />
      <Route path="/user/:name/:orderid/checkout" element={<CheckOutPage />}/>
    </Routes>)

  }
}

	return (
		<>
			{/* replace if possible */}
			<DataContext.Provider value={user}>
        <NavBar />
				<main className="App" style={{display:"flex",justifyContent:"center",alignItems:"center",alignContent:"center",flexDirection:"column"}}>	
					<MainAuth/>
				</main>
			</DataContext.Provider>
		</>
	);
}

export default App;
