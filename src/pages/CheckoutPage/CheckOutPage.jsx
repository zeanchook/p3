import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function CheckOutPage() {
	//not sure if we'll be using these states, just setting them here as I work out how to display data from the customer fetches
	const { orderid } = useParams();
	const [customerDetails, setCustomerDetails] = useState(null);

	console.log(setCustomerDetails) //can be removed

	useEffect(() => {
		const fetchCustomerDetails = async () => {
			try {
                console.log(orderid)
                const url = `/api/product/checkout/${orderid}`;
				const response = await fetch(url);
                console.log(response)
                // const response = await fetch(`/api/product/checkout/${orderid}`);
                console.log("test1",response)
				const data = await response.json();
                console.log("data",data)
				setCustomerDetails(data)
			} catch (error) {
				console.error('Error fetching user details:', error);
			}
		};

		fetchCustomerDetails();
	}, [orderid]);

	// Checkout button: handlePlaceOrderClick
	/* async function handlePlaceOrderClick(){

} */

	return (
		<>
			<div className="">
				<h2>Your Shipping Details</h2>
				{customerDetails && (
					<>
						<p>Name: {customerDetails.name}</p>
						<p>Email: {customerDetails.email}</p>
						<p>Address: {customerDetails.address}</p>
					</>
				)}
			</div>

			{/* Placeholder*/}
			<div>
				<h3>Order Summary</h3>
				<h4> Order Items</h4>
				<ul>
					{' '}
					<li> Product 1</li>
					<li> Product 2</li>
					<li> Product 3</li>
				</ul>
				<ul>
					<li>
						<span>Subtotal:</span>
						<span>$100.00</span>
					</li>
					<li>
						<span>Tax:</span>
						<span>$10.00</span>
					</li>
					<li>
						<span>Total:</span>
						<span>$110.00</span>
					</li>
				</ul>
			</div>

			<div>
				<button /*  onClick={handlePlaceOrderClick} */>Place Order</button>
			</div>
		</>
	);
}
