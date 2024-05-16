import { Link } from "react-router-dom"
import { useContext } from "react";
import { DataContext } from "../pages/App/App";
import { logOut } from "../utilities/users-service";

export default function NavBar()
{
    const userDetails = useContext(DataContext);
    console.log(userDetails)

    const handleClick = () =>
    {
      logOut();
    }

    const Authentication = () =>
    {
      if(userDetails)
      {
        return(<div onClick={handleClick}>{"Welcome : "+ userDetails.username}</div>)
      }
      else{
        return <Link to="/auth">Login</Link>
      }
    }

    
    return(
        <ul style={{display:"flex",justifyContent:"space-between",fontSize:"25px",backgroundColor:"grey"}}>
        <Link to="/">Title</Link>
        <Link to="/home">Home</Link>
        <Link to="/products">Product</Link>
        <Link to="/user/cart">Cart</Link>
        {/* <Link to="/auth">Login</Link> */}
        <Authentication />
      </ul>)
}