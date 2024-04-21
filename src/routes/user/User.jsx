import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { userQuery } from './loader';

export const User = () => {
	const params = useParams();
	const { data: user } = useQuery(userQuery(params?.userID));
	return (
		<div className=' w-full h-full text-gray-100 flex justify-center items-center pt-10'>
			<div className=' p-2 max-w-md  w-full'>
				<p className=' text-2xl  font-bold'>{user?.name}</p>
				<div className=' mt-2 '>
					<Link to={`/user/${user?.id}/posts`} className=' underline'>
						Posts
					</Link>
				</div>
			</div>
		</div>
	);
};
