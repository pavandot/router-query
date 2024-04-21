import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../services/axios/interceptor';
import { useQuery } from '@tanstack/react-query';

const fetchUser = async (userID) => {
	const res = await axiosInstance.get('/users/' + userID);
	return res.data;
};

const userQuery = (userId) => ({
	queryKey: ['users', userId],
	queryFn: () => fetchUser(userId),
	refetchOnWindowFocus: false,
	staleTime: 3000,
});

export const loader =
	(queryClient) =>
	async ({ params }) => {
		const query = userQuery(params?.userID);
		return await queryClient.ensureQueryData(query);
	};

export const User = () => {
	const params = useParams();
	const { data: user } = useQuery(userQuery(params?.userID));
	return (
		<div className=' w-full h-full text-gray-100 flex justify-center items-center pt-10'>
			<div>
				<p className=' text-2xl  font-bold'>{user?.name}</p>
				<div>
					<Link to={`/user/posts/${user?.id}`}>Posts</Link>
				</div>
			</div>
		</div>
	);
};
