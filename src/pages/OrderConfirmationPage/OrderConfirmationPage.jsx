import { useParams } from 'react-router-dom';

export default function OrderConfirmationPage({ orderDetails }) {
	const { name, orderid } = useParams();

	console.log(name, orderid);

	/*  const {custName, setCustName} = userState(null);
	 */
	/*    
  useEffect(() => {
    async function fetchUserName() {
      const user = await custName.findById(name);
      setCustName(user);
    }
    fetchUserName();
  }, [name]); */

	return (
		<>
			<h1>Thank You For Your Order!</h1>

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
