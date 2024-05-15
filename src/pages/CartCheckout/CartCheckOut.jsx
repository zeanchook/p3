import { getCartDetails } from "../../utilities/getCartDetails"
// import { useParams } from 'react-router-dom';

import { useContext, useEffect, useState } from "react";

import { DataContext } from "../App/App";

export default function CartCheckOut()
{
  const userDetails = useContext(DataContext);
  const { _id } = userDetails;
  const userid = _id;

  console.log(userid)

  const [cartState, setCartState] = useState("");
  
  const style = {
      display:"flex",
      background:"yellow",
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"column",
      maxWidth:"500px"};

    // console.log(getCartDetails());

    useEffect(() => {
      async function getDetails()
        {
            let results = await getCartDetails();
            setCartState(results)
        }
        getDetails();   
    }, []);

    //! input with user ID
    console.log(cartState)
      
    const subtotal = cartState[0]?.orderLine?.reduce((total, item) => total + item.extPrice * item.orderQty, 0);
    // const subtotal = 0;
    const DisplayItems = () =>
    {
        return cartState[0]?.orderLine?.map((item, index) => (
            <tr key={index} style={{ textAlign: "center" }}>
              <td>{index + 1}</td>
              <td>{item.product_id.title}</td>
              <td>{item.orderQty}</td>
              <td>
                <button>+</button>
                <button>-</button>
              </td>
              <td>${item.extPrice}</td>
            </tr>
          ))
    }

    const handleCheckout = () =>
    {
        //!navigate
        console.log("checkout")
    }

    return(
        <div style={style}>
      <h2>Your Cart</h2>
      <table border="1">
        <thead >
          <tr >
            <th>Product</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Add/Remove</th>
            <th>Price</th>
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