import z from 'zod'

export const GeoapifyAutocompleteSchema = z.object({
	results: z.array(
		z.object({
			datasource: z.object({
				sourcename: z.string(),
				attribution: z.string(),
				license: z.string(),
				url: z.string(),
			}),

			other_names: z.record(z.string(), z.string()).optional(),

			country: z.string(),
			country_code: z.string(),
			state: z.string().optional(),
			city: z.string().optional(),
			municipality: z.string().optional(),
			postcode: z.string().optional(),
			district: z.string().optional(),
			iso3166_2: z.string().optional(),

			lon: z.number(),
			lat: z.number(),

			result_type: z.string(),
			formatted: z.string(),

			address_line1: z.string().optional(),
			address_line2: z.string().optional(),

			category: z.string().optional(),

			timezone: z
				.object({
					name: z.string(),
					offset_STD: z.string(),
					offset_STD_seconds: z.number(),
					offset_DST: z.string(),
					offset_DST_seconds: z.number(),
					abbreviation_STD: z.string(),
					abbreviation_DST: z.string(),
				})
				.optional(),

			plus_code: z.string().optional(),

			rank: z
				.object({
					importance: z.number(),
					confidence: z.number(),
					confidence_city_level: z.number(),
					match_type: z.string(),
				})
				.optional(),

			place_id: z.string(),

			bbox: z
				.object({
					lon1: z.number(),
					lat1: z.number(),
					lon2: z.number(),
					lat2: z.number(),
				})
				.optional(),
		}),
	),

	query: z.object({
		text: z.string(),
		parsed: z
			.object({
				city: z.string().optional(),
				county: z.string().optional(),
				expected_type: z.string().optional(),
			})
			.optional(),
	}),
})

export type GeoapifyAutocompleteResponse = z.infer<
	typeof GeoapifyAutocompleteSchema
>
