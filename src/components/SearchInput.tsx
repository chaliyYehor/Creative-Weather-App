import { Autocomplete, styled, TextField } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Box } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import type { Search } from '#types/form'
import { useGetDataQuery } from '#store/services/autocompleteApi'
import { useSelector } from 'react-redux'
import type { RootType } from '#store/store'
import { SearchIcon } from 'lucide-react'

const StyledAutocomplete = styled(Autocomplete<string, false, false, false>)<{
	scale: number
	variant: 'homePage' | 'weatherPage'
}>(({ scale, variant }) => {
	return variant === 'homePage'
		? {
				width: 320 * scale,

				'& .MuiInputBase-root': {
					backgroundColor: '#fff',
					borderRadius: 5,
					paddingLeft: 14 * scale,
				},

				'& .MuiInputBase-input': {
					color: '#001e3c',
					fontSize: 16 * scale,
					padding: `${10 * scale}px 8 * size}px`,
				},

				'& label': {
					color: 'black',
				},
			}
		: {
				width: 320 * scale,

				'& .MuiInputBase-root': {
					borderRadius: 5,
					paddingLeft: 14 * scale,
				},

				'& .MuiInputBase-input': {
					color: '#fff',
					fontSize: 16 * scale,
					padding: `${10 * scale}px ${8 * scale}px`,
				},

				'& label': {
					color: '#fff',
				},

				'& .MuiInput-underline:before': {
					borderBottomColor: '#fff',
				},

				'& .MuiInput-underline:after': {
					borderBottomColor: '#fff',
				},

				'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
					borderBottomColor: '#fff',
				},
				'& .MuiAutocomplete-clearIndicator': {
					color: '#fff',
				},

				'& .MuiAutocomplete-clearIndicator:hover': {
					backgroundColor: 'rgba(255,255,255,0.1)',
				},
			}
})

type SearchInputProps = {
	setValue: React.Dispatch<React.SetStateAction<string>>
	setLatLon: React.Dispatch<React.SetStateAction<string>>
	setIsOptionSelected: React.Dispatch<React.SetStateAction<boolean>>
	scale: number
	debouncedValue: string
	typeOfInput: 'homePage' | 'weatherPage'
}

function SearchInput({
	setValue,
	setLatLon,
	setIsOptionSelected,
	scale,
	debouncedValue,
	typeOfInput,
}: SearchInputProps) {
	const lang = useSelector((state: RootType) => state.langSlice.lang)

	const { control } = useFormContext<Search>()

	const { data, isFetching } = useGetDataQuery(
		{ text: debouncedValue, lang },
		{ skip: !debouncedValue || !debouncedValue.trim() },
	)

	return (
		<Controller
			name='search'
			control={control}
			defaultValue=''
			render={({ field }) => (
				<StyledAutocomplete
					variant={typeOfInput}
					scale={scale}
					loading={isFetching}
					options={
						data?.results.map(
							suggestion =>
								`${suggestion?.city}${suggestion?.state === undefined || suggestion?.state === suggestion?.city ? '' : ', ' + suggestion?.state}${', ' + suggestion?.country}%${suggestion?.country_code}latLon${suggestion.lat},${suggestion.lon}`,
						) || []
					}
					value={field.value}
					onChange={(_, value) => {
						if (!value) return

						const latLon = value.split('latLon')[1]
						const data = value.split('%')[0]

						field.onChange(data)
						setValue(data)
						setIsOptionSelected(true)
						setLatLon(latLon)
					}}
					onInputChange={(_, value, reason) => {
						if (reason !== 'input') return

						const data = value.split('%')[0]

						field.onChange(data)
						setValue(data)
						setIsOptionSelected(false)
					}}
					renderOption={(props, option) => {
						const { key, ...rest } = props

						const data = option.split('%')
						const iconSrc = data[1].split('latLon')[0]

						return (
							<li key={key} {...rest}>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										width: '100%',
									}}
								>
									<img
										loading='lazy'
										width='20'
										srcSet={`https://flagcdn.com/w40/${iconSrc.toLowerCase()}.png 2x`}
										src={`https://flagcdn.com/w20/${iconSrc.toLowerCase()}.png`}
										alt='country icon'
									/>
									<span>{data[0]}</span>
									<LocationOnIcon fontSize='small' sx={{ opacity: 0.6 }} />
								</Box>
							</li>
						)
					}}
					renderInput={params => (
						<TextField
							{...params}
							variant={typeOfInput === 'weatherPage' ? 'standard' : 'outlined'}
							placeholder='Weather in...'
							slotProps={{
								input: {
									...params.InputProps,
									endAdornment: (
										<>
											{params.InputProps?.endAdornment}

											<SearchIcon
												size={24}
												style={{
													marginRight: 6,
													color: '#fff',
												}}
											/>
										</>
									),
								},
							}}
						/>
					)}
				/>
			)}
		/>
	)
}

export default SearchInput
