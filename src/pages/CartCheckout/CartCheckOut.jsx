import { getCartDetails } from "../../utilities/getCartDetails"
import debug from 'debug';
// import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// import { produce } from "immer";

// import {useAtom} from "jotai"
// import { testAtom } from "../../../atom";

import { useContext, useEffect, useState } from "react";

import { DataContext } from "../App/App";

export default function CartCheckOut()
{
  const log = debug('mern:pages:CartCheckout:CartCheckout');

  const userDetails = useContext(DataContext);
  const { _id } = userDetails;
  const userid = _id;

  const navigate = useNavigate();

  // const [value,setValue] = useAtom(testAtom)
  // console.log(value)

  log('user %o', userid);

  const [cartState, setCartState] = useState("");
  
  const style = {
      display:"flex",
      background:"yellow",
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"column",
      maxWidth:"1000px"};

    function handleIncreaseQty(event) {
      // setQuantity((prevQuantity) => prevQuantity + 1);
      console.log(event.target.value)
    }
  
    function handleDecreaseQty() {
      // if (quantity > 1) {
      //   // setQuantity((prevQuantity) => prevQuantity - 1);
      // }
    }

    useEffect(() => {
      async function getDetails()
        {
            let results = await getCartDetails(userid);

            const finder = results?.findIndex(item => item.paidStatus === false)
            console.log(finder)
            console.log(results);
            setCartState(results);
        }
        getDetails();   
    }, [userid]);

    //! input with user ID
    // console.log(cartState)
      
    const subtotal = cartState[0]?.orderLine?.reduce((total, item) => total + item.extPrice * item.orderQty, 0);
    
    const DisplayItems = () =>
    {
        return cartState[0]?.orderLine?.map((item, index) => (
            <tr key={index} style={{ textAlign: "center" }}>
              <td>{index + 1}</td>
              <td><img src={item.product_id.picture} alt="img" style={{width:"50%"}}></img></td>
              <td>{item.product_id.title}</td>
              <td>{item.orderQty}</td>
              <td>
              <button onClick={handleIncreaseQty} value={item.orderQty}>+</button>
              <button onClick={handleDecreaseQty}>-</button>
                <button>Remove</button>
              </td>
              <td>${item.extPrice}</td>
            </tr>
          ))
    }

    const handleCheckout = () =>
    {
        //!navigate
        navigate("/user/:name/:orderid/checkout")
    }

    return(
      <div style={style}>
      <h2>Your Cart</h2>
      <table border="02" className="table-auto">
        <thead >
          <tr >
            <th>S/N</th>
            <th>Product</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Add/Remove</th>
            <th >Price</th>
          </tr>
        </thead>
        <tbody >
          <DisplayItems/>
        </tbody>
      </table>
      <p style={{border: "1px solid rgb(0, 0, 0)"}}>Subtotal: ${subtotal}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
    )
}

