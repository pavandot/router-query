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
const About = lazy(() => import('./routes/About'));
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
					let { Users, loader: usersLoader } = await import('./routes/Home');
					return { Component: Users, loader: usersLoader(queryClient) };
				},
			},
			{
				path: '/about',
				element: (
					<Suspense fallback={<p>loading...</p>}>
						<About />
					</Suspense>
				),
			},
			{
				path: '/user/:userID',
				async lazy() {
					let { User, loader: userLoader } = await import('./routes/User');
					return {
						Component: User,
						loader: userLoader(queryClient),
					};
				},
			},
			{
				path: '/user/posts/:userID',
				async lazy() {
					let { Posts, loader: postsLoader } = await import('./routes/Posts');
					return {
						Component: Posts,
						loader: postsLoader(queryClient),
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
