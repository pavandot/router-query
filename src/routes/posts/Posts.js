import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { postsQuery } from './loader';

export const Posts = () => {
	const params = useParams();
	const { data: posts } = useQuery(postsQuery(params.userID));
	return (
		<div className=' w-full h-full flex justify-center items-center pt-10'>
			<div className=' max-w-md mx-auto  text-white w-full flex flex-col gap-5'>
				{posts?.map((post) => {
					return (
						<div key={post?.id} className=' p-2 rounded bg-slate-600 '>
							<p className=' font-bold pb-2'>{post?.title}</p>
							<p>{post?.body}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
