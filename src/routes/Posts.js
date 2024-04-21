import React, { useEffect } from 'react';
import axiosInstance from '../services/axios/interceptor';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const fetchUserPosts = async (userID) => {
	const res = await axiosInstance.get('/users/' + userID + '/posts');
	return res.data;
};

const postsQuery = (userId) => ({
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

export const Posts = () => {
	const params = useParams();
	const { data: posts } = useQuery(postsQuery(params.userID));
	let testArray = null;
	return (
		<div className=' w-full h-full flex justify-center items-center pt-10'>
			<div className=' max-w-md mx-auto  text-white w-full flex flex-col gap-5'>
				{posts?.map((post) => {
					return (
						<div key={posts?.id} className=' p-2 rounded bg-slate-600 '>
							<p className=' font-bold pb-2'>{post?.title}</p>
							<p>{post?.body}</p>
						</div>
					);
				})}
			</div>
			{testArray?.map((test) => {
				return <div key={test}>{test}</div>;
			})}
		</div>
	);
};
