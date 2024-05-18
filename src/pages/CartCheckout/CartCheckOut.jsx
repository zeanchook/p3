import { getCartDetails } from "../../utilities/cart-service"
// import debug from 'debug';
// import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


import {useAtom} from "jotai"
import { cartItems } from "../../../atom";

import { useContext, useEffect } from "react";

import { handleCart,deleteCart } from "../../utilities/cartHandler";

import { DataContext } from "../App/App";

export default function CartCheckOut()
{
  // const log = debug('mern:pages:CartCheckout:CartCheckout');

  const userDetails = useContext(DataContext);
  const { _id } = userDetails;
  const userid = _id;

  const navigate = useNavigate();
  const [cartStates,setCartState] = useAtom(cartItems);
  
  // log('user %o', userid);

  const style = {
      display:"flex",
      background:"yellow",
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"column",
      maxWidth:"1000px"};

    const handleQty = async (event) => {
      setCartState(await handleCart("NA",cartStates,parseInt(event.target.value),event.target.name))
    }

    const handleRemove = async(event) =>
    {
      setCartState(deleteCart(event.target.name,cartStates))
    }

    console.log(cartStates)
    useEffect(() => {
      async function getDetails()
        {
            let results = await getCartDetails(userDetails._id);
            const finder = results?.findIndex(item => item.paidStatus === false)
            setCartState(results[finder]);
        }
        getDetails();   
    }, [setCartState, userDetails._id]);


    const subtotal = (cartStates?.orderLine?.reduce((total, item) => total + item.extPrice * item.orderQty, 0));
    
    const DisplayItems = () =>
    {
        if(cartStates?.orderLine?.length === 0)
        {
          return ("Please at least add some item !")
        }
        return cartStates?.orderLine?.map((item, index) => (
            <tr key={index} style={{ textAlign: "center" }}>
              <td>{index + 1}</td>
              <td><img src={item.product_id.picture} alt="img" style={{width:"50%"}}></img></td>
              <td>{item.product_id.title}</td>
              <td>{item.orderQty}</td>
              <td>
              <button onClick={handleQty} name={item.product_id._id} value="1">+</button>
              <button onClick={handleQty} name={item.product_id._id} value="-1">-</button>
              <button onClick={handleRemove} name={item.product_id._id}>Remove</button>
              </td>
              <td>${(item.extPrice).toFixed(2)}</td>
            </tr>
          ))
    }

    const handleCheckout = () =>
    {
        //!navigate
        navigate(`/user/${userid}/${cartStates._id}/checkout`)
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
      <p style={{border: "1px solid rgb(0, 0, 0)"}}>Subtotal: ${subtotal.toFixed(2)}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
    )
}

