import ErrorPage from '#pages/ErrorPage'
import Main from '#pages/Main'
import WeatherIn from '#pages/WeatherIn'
import { searchSchema, type Search } from '#types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/weatherIn/:city',
		element: <WeatherIn />,
	},
])

export default function App() {
	const methods = useForm<Search>({
		resolver: zodResolver(searchSchema),
		defaultValues: { search: '' },
	})

	return (
		<>
			<FormProvider {...methods}>
				<RouterProvider router={router} />
			</FormProvider>
		</>
	)
}
