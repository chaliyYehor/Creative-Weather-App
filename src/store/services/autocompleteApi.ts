import type { GeoapifyAutocompleteResponse } from '#schemas/autocompleteSchema'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = import.meta.env.VITE_AUTOCOMPLETE_API_KEY

export const autocompleteApi = createApi({
	reducerPath: 'autocompleteApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.geoapify.com/v1/geocode',
	}),
	endpoints: builder => ({
		getData: builder.query<
			GeoapifyAutocompleteResponse,
			{ text: string; lang: 'uk' | 'en' }
		>({
			query: ({ text, lang }) => ({
				url: 'autocomplete',
				params: {
					text,
					lang,
					type: 'city',
					limit: 5,
					format: 'json',
					apiKey: '6e49b703b6bc4e839e273409455d1c71',
				},
			}),
		}),
	}),
})

export const { useGetDataQuery } = autocompleteApi
