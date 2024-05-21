import { useState } from "react";
// import debug from "debug";

import {useAtom} from "jotai"
import { cartItems } from "../../atom";

// import { getCartDetails } from "../utilities/cart-service"
import { handleCart } from "../utilities/cartHandler";

// const log = debug("mern:pages:AddToCart");

export default function AddToCart({ productId }) {
  const [quantity, setQuantity] = useState(1);
  // const userDetails = useAtomValue(loginSts);
  const [cartState,setCartState] = useAtom(cartItems);

  function handleIncreaseQty() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  function handleDecreaseQty() {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      
    }
  }

const handleAddToCart = async (event) =>
{
  setCartState(await handleCart(event.target.name,cartState,quantity,productId))
}

  return (
    <div>
      <div>Quantity</div>
      <p>{quantity}</p>
      <button onClick={handleIncreaseQty}>+</button>
      <button onClick={handleDecreaseQty}>-</button>
      <br />
      <button onClick={handleAddToCart} name="addcart">Add to Cart</button>
    </div>
  );
}
