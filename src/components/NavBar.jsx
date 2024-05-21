import { Link } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
import { loginSts } from '../../atom';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
	const userDetails = useAtomValue(loginSts);
	const [user] = useAtom(loginSts);
	const goTo = useNavigate();

	console.log(userDetails, user);

	const handleClick = () => {
		console.log(userDetails._id)
		goTo(`/user/${userDetails._id}`);
	};

	const Authentication = () => {
		if (userDetails) {
			return (
				<div>
					<div onClick={handleClick}>Welcome : {userDetails.username}</div>
				</div>
			);
		} else {
			return <Link to="/auth">Login</Link>;
		}
	};

	return (
		<ul
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				fontSize: '25px',
				backgroundColor: 'grey',
			}}
		>
			<Link to="/">Title</Link>
			<Link to="/home">Home</Link>
			<Link to="/products">Product</Link>
			<Link to="/user/cart">Cart</Link>
			{/* <Link to="/auth">Login</Link> */}
			<Authentication />
		</ul>
	);
}
