import axiosInstance from '../../services/axios/interceptor';

const fetchUsers = async () => {
	const res = await axiosInstance.get('/users');
	return res.data;
};

export const usersQuery = () => ({
	queryKey: ['users'],
	queryFn: fetchUsers,
	refetchOnWindowFocus: false,
	staleTime: 3000,
});

export const loader = (queryClient) => async () => {
	const query = usersQuery();
	return await queryClient.ensureQueryData(query);
};
