import React, { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import './index.css';

const queryClient = new QueryClient();

// Route pages
const Root = lazy(() => import('./routes/Root'));
const ErrorPage = lazy(() => import('./components/ErrorPage'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				async lazy() {
					let { loader: usersLoader } = await import('./routes/home/loader');
					let { Users } = await import('./routes/home/Home');
					return { loader: usersLoader(queryClient), Component: Users };
				},
			},
			{
				path: '/user/:userID',
				async lazy() {
					let { loader: userLoader } = await import('./routes/user/loader');
					let { User } = await import('./routes/user/User');
					return {
						Component: User,
						loader: userLoader(queryClient),
					};
				},
			},
			{
				path: '/user/:userID/posts/',
				async lazy() {
					let { loader: postsLoader } = await import('./routes/posts/loader');
					let { Posts } = await import('./routes/posts/Posts');
					return {
						Component: Posts,
						loader: postsLoader(queryClient),
					};
				},
			},
			{
				path: '/about',
				async lazy() {
					let { About } = await import('./routes/About');
					return {
						Component: About,
					};
				},
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Suspense fallback={<p>loading...</p>}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</Suspense>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
