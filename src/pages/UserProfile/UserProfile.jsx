import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
	const { name } = useParams();
	const [userOrders, setUserOrders] = useState(null);
	/* const [userOrderDetails , setUserOrderDetails] = useState(null);
	 */
	//fetch orders under userId
	useEffect(() => {
		const fetchOrderIds = async () => {
			try {
				const response = await fetch(`/api/product/${name}/orders`);
				const data = await response.json();
				setUserOrders(data);
				console.log("user's orders", userOrders);
			} catch (error) {
				console.error(error);
			}
		};

		fetchOrderIds();
	}, [name]);

	//fetch order data
	//button function to display order when clicked

	return (
		<>
			<div>
				<h4>Order History</h4>
				{/* map to create buttons featuring order numbers */}
			</div>

			<div>
				<h4>Order Details</h4>
			</div>
		</>
	);
}
