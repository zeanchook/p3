import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function OrderConfirmationPage() {
	const location = useLocation();
	const { orderid } = useParams();
	const { orderDetails, customerDetails } = location.state;

	return (
		<>
			<h1>Thank You For Your Order, {customerDetails.name}!</h1>
			<br></br>
			<p>Your order ID is {orderid}</p>
			<br></br>
			<div>
				<h3>Here are your order details:</h3>
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
		</>
	);
}
