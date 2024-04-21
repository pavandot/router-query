import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { usersQuery } from './loader';

export const Users = () => {
	const { data: users } = useQuery(usersQuery());
	return (
		<div className=' w-full h-full flex justify-center items-center pt-10'>
			<div className=' max-w-md mx-auto  text-white w-full flex flex-col gap-5'>
				{users?.map((user) => {
					return (
						<Link
							to={`/user/${user?.id}`}
							key={user?.id}
							className=' flex p-2 justify-between rounded items-center bg-slate-600 '
						>
							<p>{user?.name}</p>
							<p>{user?.email}</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
};
