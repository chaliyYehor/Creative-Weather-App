// import Loader from '#components/Loader'
import ErrorPage from '#pages/ErrorPage'
import Main from '#pages/Main'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		errorElement: <ErrorPage />
	},
])

export default function App() {
	return (
		<>
			<RouterProvider router={router} />
			{/* <Loader /> */}
		</>
	)
}
