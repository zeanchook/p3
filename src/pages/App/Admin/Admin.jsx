import {useAtomValue} from "jotai"
import { loginSts } from "../../../../atom";

import { useState } from "react";

import AdminCreateProduct from "../../AdminCreateProduct/AdminCreateProduct";
import AdminViewOrder from "../../../components/AdminViewOrder/AdminViewOrder";
import AdminDeleteProduct from "../../../components/AdminDeleteProduct/AdminDeleteProduct";

export default function AdminPage()
{
    const userDetails = useAtomValue(loginSts);
    const { usertype } = userDetails;

    const [pageState, setPageState] = useState("")

    const handleClick = (event) =>
    {
      if(event.target.name === "create")
      {
        setPageState(<AdminCreateProduct/>)
      }
      else if (event.target.name === "view"){
        setPageState(<AdminViewOrder/>)
      }
      else if (event.target.name === "delete"){
        setPageState(<AdminDeleteProduct/>)
      }
      
    }

    // console.log(userDetails,usertype)

    const AdminPage = () =>
    {
      if(usertype !== "admin")
      {
          return(<h1>Sorry you have no access to this page!</h1>)
      }
      else{
          return <div style={{display:"flex",flexDirection:"column"}}>Welcome Admin! Please select your option:
            <button onClick={handleClick} name="create" className="border-2 border-rose-500">Create Product</button>
            <button onClick={handleClick} name="delete" className="border-2 border-rose-500">Delete Product</button>
            <button onClick={handleClick} name="view" className="border-2 border-rose-500">View User Order Status</button>
          </div>
      }
    }
    

    return(<><AdminPage/><div style={{margin:"50px"}}>{pageState}</div></>)
}