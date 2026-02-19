import type { ForecastResponse } from '#schemas/weatherType'
import { queryOptions } from '@tanstack/react-query'

export default function autocompleteQueryOptions(
	search: string,
	lang: 'uk' | 'en',
) {
	return queryOptions({
		queryKey: ['autocomplete', search, lang],
		queryFn: () => fetchSuggestions(search, lang),
		enabled: !!search,
	})
}

async function fetchSuggestions(
	search: string,
	lang: 'uk' | 'en',
): Promise<ForecastResponse> {
	const res = await fetch(
		`https://api.weatherapi.com/v1/forecast.json?key=613c520156554f38bcc151141260402&q=${search}&days=7&aqi=no&alerts=yes&lang=${lang}
`,
	)

	if (!res.ok) {
		throw new Error('Geoapify request failed')
	}

	const data: ForecastResponse = await res.json()

	return data
}
