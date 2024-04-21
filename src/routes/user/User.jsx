import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { userQuery } from './loader';

export const User = () => {
	const params = useParams();
	const { data: user } = useQuery(userQuery(params?.userID));
	return (
		<div className=' w-full h-full text-gray-100 flex justify-center items-center pt-10'>
			<div>
				<p className=' text-2xl  font-bold'>{user?.name}</p>
				<div>
					<Link to={`/user/${user?.id}/posts`}>Posts</Link>
				</div>
			</div>
		</div>
	);
};
