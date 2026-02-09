import { zodResolver } from '@hookform/resolvers/zod'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import { useDebounce } from '@uidotdev/usehooks'
import TextField from '@mui/material/TextField'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'
import { Search as SearchIcon } from 'lucide-react'
import Button from '@mui/material/Button'
import useMediaQuery from '@mui/material/useMediaQuery'
import gsap from 'gsap'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import autocompleteQueryOptions from '#queryOptions/autocompleteQueryOptions'
import { Box } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const StyledAutocomplete = styled(Autocomplete<string, false, false, true>)<{
	scale: number
}>(({ scale }) => ({
	width: 320 * scale,

	'& .MuiInputBase-root': {
		backgroundColor: '#fff',
		borderRadius: 5,
		paddingLeft: 14 * scale,
	},

	'& .MuiInputBase-input': {
		color: '#001e3c',
		fontSize: 14 * scale,
		padding: `${10 * scale}px 8 * size}px`,
	},

	'& label': {
		color: 'black',
	},
}))

const StyledSubmitButton = styled(Button)(() => ({
	'&.Mui-disabled': {
		backgroundColor: '#1976d2',
		color: '#fff',
		opacity: 1,
		cursor: 'not-allowed',
	},
}))

const searchSchema = z.object({
	search: z.string().min(2),
})

type Search = z.infer<typeof searchSchema>

export default function Search() {
	const [value, setValue] = useState('')
	const debouncedSearchTerm = useDebounce(value, 300)

	const { data, isFetching } = useQuery(
		autocompleteQueryOptions(debouncedSearchTerm),
	)

	const isExtraSm = useMediaQuery('(max-width:355px)')
	const isSmall = useMediaQuery('(max-width:600px)')
	const isLarge = useMediaQuery('(min-width:1025px)')

	let scale = 1.3

	if (isExtraSm) scale = 0.8
	else if (isSmall) scale = 1

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<Search>({ resolver: zodResolver(searchSchema) })

	const onSubmit: SubmitHandler<Search> = async data => {
		// gsap.to('.slicesWrapper div', {
		// 	x: 0,
		// 	duration: 1,
		// 	stagger: 0.1,
		// 	delay: 0.3,
		// 	ease: 'power1.inOut',
		// })

		console.log(data)
	}

	return (
		<>
			<form
				className={
					'flex flex-col sm:flex-row justify-center items-center gap-5'
				}
				onSubmit={handleSubmit(onSubmit)}
			>
				<Controller
					name='search'
					control={control}
					defaultValue=''
					render={({ field }) => (
						<StyledAutocomplete
							scale={scale}
							freeSolo
							loading={isFetching}
							options={
								data?.results.map(
									suggestion =>
										`${suggestion?.city}${suggestion?.state === undefined || suggestion?.state === suggestion?.city ? '' : ', ' + suggestion?.state}${', ' + suggestion?.country}%${suggestion?.country_code}`,
								) || []
							}
							value={field.value}
							onChange={(_, value) => {
								field.onChange(value ?? '')
								setValue(value as string)
							}}
							onInputChange={(_, value) => {
								field.onChange(value)
								setValue(value)
							}}
							renderOption={(props, option) => {
								const { key, ...rest } = props

								const data = option.split('%')
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
												srcSet={`https://flagcdn.com/w40/${data[1].toLowerCase()}.png 2x`}
												src={`https://flagcdn.com/w20/${data[1].toLowerCase()}.png`}
												alt=''
											/>
											<span>{data[0]}</span>
											<LocationOnIcon fontSize='small' sx={{ opacity: 0.6 }} />
										</Box>
									</li>
								)
							}}
							renderInput={params => (
								<TextField {...params} placeholder='Weather in...' />
							)}
						/>
					)}
				/>
				<div className='search'>
					<StyledSubmitButton
						disabled={isSubmitting}
						sx={{ height: '50px', fontSize: '1.1rem', borderRadius: '25px' }}
						variant='contained'
						startIcon={isLarge || isSmall ? <SearchIcon /> : ''}
						type='submit'
					>
						{isLarge || isSmall ? 'Search' : <SearchIcon />}
					</StyledSubmitButton>
				</div>
			</form>
		</>
	)
}
