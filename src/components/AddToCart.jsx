import { useContext,useState,useEffect } from "react";
// import debug from "debug";
import { DataContext } from "../pages/App/App";
import { produce } from "immer";

import {useAtom} from "jotai"
import { cartItems } from "../../atom";

import { getCartDetails,updateCartDetails,createCartDetails } from "../utilities/getCartDetails"

// const log = debug("mern:pages:AddToCart");

export default function AddToCart({ productId }) {
  const [quantity, setQuantity] = useState(1);
  const [orderId, setOrderID] = useState("")

  // const [value,setValue] = useAtom(cartItems)

  const userDetails = useContext(DataContext);

  const [cartState,setCartState] = useAtom(cartItems)

  console.log(productId);
  // const userId = "6644c1099fbe48e26e5525e8";
  
  function handleIncreaseQty() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  function handleDecreaseQty() {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      
    }
  }

  //patch, post
  function handleAddToCart() {
    const orderLineFinder = cartState?.findIndex(item => item.product_id._id === productId || item.product_id === productId)
    console.log(cartState)
    // patch
    if(orderLineFinder!== -1){
      const nextState = produce(cartState, (draft) => {
        // console.log(cartState)
        draft[orderLineFinder].orderQty += quantity;
    });
    console.log(nextState[orderLineFinder])
    updateCartDetails(nextState[orderLineFinder]);
    // patchResult.then(function(result) {
    //     // console.log(result)
    //  })
    setCartState(nextState);
    }  
    else{
      const orderLine= 
        {
          product_id: productId,
          orderQty: quantity,
        }
    createCartDetails(orderId,orderLine);
    //   createdResult.then(function(result) {
    //   console.log(result.orderLine)
    //  })
     const nextState = produce(cartState, (draft) => {
      draft.push(orderLine)
  });
    setCartState(nextState);
    }
}

  useEffect(() => {
    async function getDetails()
      {
          let results = await getCartDetails(userDetails._id);
          // console.log(results)
          const finder = results?.findIndex(item => item.paidStatus === false)
          setOrderID(results[finder]._id)
          setCartState(results[finder].orderLine);
      }
      getDetails();   
  }, [setCartState, userDetails._id]);

  return (
    <div>
      <div>Quantity</div>
      <p>{quantity}</p>
      <button onClick={handleIncreaseQty}>+</button>
      <button onClick={handleDecreaseQty}>-</button>
      <br />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
