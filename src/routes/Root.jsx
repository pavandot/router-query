import { Link, useNavigation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
const Root = () => {
	const navigation = useNavigation();
	return (
		<section className=' bg-gray-700 w-full min-h-screen p-10'>
			<header className=' flex justify-between items-center max-w-4xl mx-auto text-gray-100'>
				<Link to='/' className=' font-bold text-xl cursor-pointer'>
					Marketplace
				</Link>
				<ul className=' flex items-center gap-x-5'>
					<Link to='/about' className=' cursor-pointer'>
						About
					</Link>
				</ul>
			</header>
			<div className={` max-w-4xl mx-auto pt-10   ${navigation.state === 'loading' ? 'opacity-50' : ''} `}>
				<Outlet />
			</div>
		</section>
	);
};

export default Root;
