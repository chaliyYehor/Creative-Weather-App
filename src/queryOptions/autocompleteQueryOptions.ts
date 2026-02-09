import { type GeoapifyAutocompleteResponse } from '#schemas/autocompleteSchema'
import { queryOptions } from '@tanstack/react-query'

const API_KEY = import.meta.env.VITE_AUTOCOMPLETE_API_KEY

export default function autocompleteQueryOptions(search: string) {
	return queryOptions({
		queryKey: ['autocomplete', search],
		queryFn: () => fetchSuggestions(search),
		enabled: !!search,
	})
}

async function fetchSuggestions(
	search: string,
): Promise<GeoapifyAutocompleteResponse> {
	const res = await fetch(
		`https://api.geoapify.com/v1/geocode/autocomplete?text=${search}&type=city&limit=5&lang=uk&format=json&apiKey=${API_KEY}
`,
	)

	if (!res.ok) {
		throw new Error('Geoapify request failed')
	}

	const data: GeoapifyAutocompleteResponse = await res.json()

	return data
}
