import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckOutPage() {
	const { name, orderid } = useParams();
	const [customerDetails, setCustomerDetails] = useState(null);
	const [orderDetails, setOrderDetails] = useState(null);
	const goToResults = useNavigate();

	useEffect(() => {
		const fetchCustomerDetails = async () => {
			try {
				console.log('order', orderid);
				const url = `/api/product/checkout/${orderid}`;
				const response = await fetch(url);
				const data = await response.json();
				setCustomerDetails(data);
			} catch (error) {
				console.error('Error fetching user details:', error);
			}
		};

		fetchCustomerDetails();
	}, [orderid]);

	useEffect(() => {
		const fetchOrderDetails = async () => {
			try {
				const url = `/api/product/order/${orderid}`;
				console.log('username', orderid);
				const response = await fetch(url);

				console.log('order details', response);
				const data = await response.json();
				console.log('data', data);
				setOrderDetails(data);
			} catch (error) {
				console.error('Error fetching order details:', error);
			}
		};
		fetchOrderDetails();
	}, [orderid]);

	async function handlePlaceOrderClick() {
		try {
			const response = await fetch(`/api/product/${orderid}/${name}/paid`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({}),
			});

			if (!response.ok) {
				throw new Error('Error updating order status');
			}

			goToResults(`/user/${name}/${orderid}/thankyou`, {
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
				<h2>Order Summary</h2>
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
							orderDetails[0].orderLine?.map((item, index) => (
								<tr key={index}>
									<td>{item.product_id?.title}</td>
									<td>{item.orderQty}</td>
									<td>${item.product_id.price * item.orderQty}</td>
								</tr>
							))}
					</tbody>
				</table>
				<p>Order Total: ${orderDetails && orderDetails[0].orderTotal}</p>
			</div>

			<div>
				<button onClick={handlePlaceOrderClick}>Place Order</button>
			</div>
		</>
	);
}
