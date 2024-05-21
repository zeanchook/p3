import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sendRequest from '../../utilities/send-request';
import { useAtom, useAtomValue } from 'jotai';
import { loginSts, cartItems } from '../../../atom';

export default function CheckOutPage() {
	const [customerDetails, setCustomerDetails] = useState(null);
	const [orderDetails, setOrderDetails] = useState(null);
	const goToResults = useNavigate();
	const currentcartItems = useAtomValue(cartItems);
	const orderid = currentcartItems._id;
	const [user] = useAtom(loginSts);

	useEffect(() => {
		setCustomerDetails(user);
	}, [user]);

	useEffect(() => {
		setOrderDetails(currentcartItems);
	}, [currentcartItems]);

	/* 	useEffect(() => {
		const fetchCustomerDetails = async () => {
			try {
				console.log('order', orderid);
				const url = `/api/orders/checkout/${orderid}`;
				const response = await fetch(url);
				const data = await response.json();
				setCustomerDetails(data);
			} catch (error) {
				console.error('Error fetching user details:', error);
			}
		};

		fetchCustomerDetails();
	}, [orderid]);
 */
	/* useEffect(() => {
		const fetchOrderDetails = async () => {
			try {
				const url = `/api/orders/order/${orderid}`;
				const response = await fetch(url);
				console.log('order details', response);
				const data = await response.json();
				console.log('data', data);
				console.log(data.findIndex((x) => x._id === orderid));
				setOrderDetails(data[data.findIndex((x) => x._id === orderid)]);
			} catch (error) {
				console.error('Error fetching order details:', error);
			}
		};
		fetchOrderDetails();
	}, [orderid]); */

	async function handlePlaceOrderClick() {
		try {
			// const response = await fetch(`/api/orders/${orderid}/${name}/paid`, {
			// 	method: 'PATCH',
			// 	headers: { 'Content-Type': 'application/json' },
			// 	body: JSON.stringify({}),

			// });
			await sendRequest(`/api/orders/${orderid}/paid`, 'PATCH');
			// console.log(response.ok)
			// // sendRequest(`/api/orders/${orderid}/${name}/paid`,"PATCH")
			// if (!response.ok) {
			// 	throw new Error('Error updating order status');
			// }

			goToResults(`/user/${orderid}/thankyou`, {
				state: {
					orderDetails: orderDetails,
					customerDetails: customerDetails,
				},
			});
		} catch (error) {
			console.error('Error updating order details:', error);
		}
	}

	return (
		<>
			<div className="">
				<h2>Your Shipping Details</h2>
				{customerDetails && (
					<table>
						<tbody>
							<tr>
								<td>Name:</td>
								<td>{customerDetails.name}</td>
							</tr>
							<tr>
								<td>Email:</td>
								<td>{customerDetails.email}</td>
							</tr>
							<tr>
								<td>Address:</td>
								<td>{customerDetails.address}</td>
							</tr>
						</tbody>
					</table>
				)}
			</div>

			<div>
				<br></br>
				<h2>Cart Summary</h2>

				<table>
					<thead>
						<tr>
							<th>Product</th>
							<th>Quantity</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{orderDetails &&
							orderDetails.products?.map((item, index) => (
								<tr key={index}>
									<td>{item.title}</td>
									<td>{item.quantity}</td>
									<td>${item.price * item.quantity}</td>
								</tr>
							))}
					</tbody>
				</table>
				<p>Cart Total: {orderDetails && orderDetails.total}</p>
			</div>

			<div>
				<button onClick={handlePlaceOrderClick}>Place Order</button>
			</div>
		</>
	);
}
