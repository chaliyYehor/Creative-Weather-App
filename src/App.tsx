import { SearchContext } from '#constants/searchContext'
import ErrorPage from '#pages/ErrorPage'
import Main from '#pages/Main'
import WeatherIn from '#pages/WeatherIn'
import { searchSchema, type Search } from '#types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounce, useMediaQuery } from '@uidotdev/usehooks'
import { useState } from 'react'
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
	const [latLon, setLatLon] = useState('')
	const [isOptionSelected, setIsOptionSelected] = useState(false)
	const [value, setValue] = useState('')
	const debouncedSearchTerm = useDebounce(value, 300)

	const isExtraSm = useMediaQuery('(max-width:355px)')
	const isSmall = useMediaQuery('(max-width:600px)')
	const isLarge = useMediaQuery('(min-width:1025px)')

	let scale = 1.3

	if (isExtraSm) scale = 0.8
	else if (isSmall) scale = 1

	const methods = useForm<Search>({
		resolver: zodResolver(searchSchema),
		defaultValues: { search: '' },
	})

	return (
		<>
			<SearchContext.Provider
				value={{
					debouncedValue: debouncedSearchTerm,
					scale: scale,
					setIsOptionSelected: setIsOptionSelected,
					setValue: setValue,
					setLatLon: setLatLon,
					isLarge: isLarge,
					latLon: latLon,
					isSmall: isSmall,
					isOptionSelected: isOptionSelected,
				}}
			>
				<FormProvider {...methods}>
					<RouterProvider router={router} />
				</FormProvider>
			</SearchContext.Provider>
		</>
	)
}
