import ErrorPage from '#pages/ErrorPage'
import Main from '#pages/Main'
import WeatherIn from '#pages/WeatherIn'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		errorElement: <ErrorPage />
	},
	{
		path: '/weatherIn/:city',
		element: <WeatherIn />
	}
])

export default function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}
