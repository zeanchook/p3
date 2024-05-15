import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function CheckOutPage() {
	//not sure if we'll be using these states, just setting them here as I work out how to display data from the customer fetches
	const { orderId } = useParams();
	const [customerId, setCustomerId] = useState(null);
	const [customerDetails, setCustomerDetails] = useState(null);

	useEffect(() => {
		const fetchCustomerId = async () => {
			try {
				const response = await fetch(`../../routes/api/checkout/${orderId}`);
				const data = await response.json();
				setCustomerId(data);
			} catch (error) {
				console.error('Error fetching user details:', error);
			}
		};

		fetchCustomerId();
	}, [orderId]);

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
