import axiosInstance from '../../services/axios/interceptor';

const fetchUser = async (userID) => {
	const res = await axiosInstance.get('/users/' + userID);
	return res.data;
};

export const userQuery = (userId) => ({
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
