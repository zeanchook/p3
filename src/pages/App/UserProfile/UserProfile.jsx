import { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import { getCartDetails } from "../../../utilities/getCartDetails"
// import { PaperClipIcon } from '@heroicons/react/20/solid'


export default function UserProfile()
{
    const[details, setDetailsPage] = useState("")
    const userDetails = useContext(DataContext);
    const { _id } = userDetails;
    const userid = _id;

    console.log(userid)

    useEffect(() => {
        async function getDetails()
          {
              let results = await getCartDetails(userid);
              setDetailsPage(results);
                console.log(results)
          }
          getDetails();   
      }, [userid]);
    
        // const OrderDetails = () => {
        // if(details){
        // details?.map(item => 
        // {
        //     return ("item")
        // })}
        // else{
        //     return ("Please order something!")
        // }}

    
      console.log(details)
    return(
        <>
            <div>Order History</div>
            {/* <OrderDetails/> */}
        </>)
}