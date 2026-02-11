import type { ForecastResponse } from '#schemas/weatherType'
import { queryOptions } from '@tanstack/react-query'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

export default function autocompleteQueryOptions(search: string) {
	return queryOptions({
		queryKey: ['autocomplete', search],
		queryFn: () => fetchSuggestions(search),
		enabled: !!search,
	})
}

async function fetchSuggestions(search: string): Promise<ForecastResponse> {
	const res = await fetch(
		`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${search}&days=7&aqi=no&alerts=yes&lang=en
`,
	)

	if (!res.ok) {
		throw new Error('Geoapify request failed')
	}

	const data: ForecastResponse = await res.json()

	return data
}
