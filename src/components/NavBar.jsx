import { Link } from "react-router-dom"
import { logOut } from "../utilities/users-service";
import {useAtom,useAtomValue} from "jotai"
import { loginSts } from "../../atom";

export default function NavBar()
{
    const userDetails = useAtomValue(loginSts);

    const [user, setUser] = useAtom(loginSts);

    console.log(userDetails,user)

    const handleClick = () =>
    {
      logOut();
      setUser("")
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