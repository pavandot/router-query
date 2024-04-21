import axiosInstance from '../../services/axios/interceptor';

const fetchUserPosts = async (userID) => {
	const res = await axiosInstance.get('/users/' + userID + '/posts');
	return res.data;
};

export const postsQuery = (userId) => ({
	queryKey: ['users', 'posts', userId],
	queryFn: () => fetchUserPosts(userId),
	refetchOnWindowFocus: false,
	staleTime: 3000,
});

export const loader =
	(queryClient) =>
	async ({ params }) => {
		const query = postsQuery(params?.userID);
		return await queryClient.ensureQueryData(query);
	};
