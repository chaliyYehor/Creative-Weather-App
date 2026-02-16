import { createContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'

export type SearchContextType = {
	debouncedValue: string
	scale: number
	setIsOptionSelected: Dispatch<SetStateAction<boolean>>
	setValue: Dispatch<SetStateAction<string>>
	setLatLon: Dispatch<SetStateAction<string>>
	isLarge: boolean
	isSmall: boolean
	isOptionSelected: boolean
	latLon: string
}

export const SearchContext = createContext<SearchContextType | null>(null)
