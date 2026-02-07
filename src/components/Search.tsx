import { zodResolver } from '@hookform/resolvers/zod'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'
import { Search as SearchIcon } from 'lucide-react'
import Button from '@mui/material/Button'
import useMediaQuery from '@mui/material/useMediaQuery'

const StyledAutocomplete = styled(Autocomplete)<{ scale: number }>(
	({ scale }) => ({
		width: 320 * scale,

		/* input wrapper */
		'& .MuiInputBase-root': {
			backgroundColor: '#fff',
			borderRadius: 5,
			paddingLeft: 14 * scale,
		},

		/* сам input */
		'& .MuiInputBase-input': {
			color: '#001e3c',
			fontSize: 14 * scale,
			padding: `${10 * scale}px 8 * size}px`,
		},

		/* placeholder / label */
		'& label': {
			color: 'black',
		},
	}),
)

const StyledSubmitButton = styled(Button)(() => ({
	/* disabled — переопределяем MUI */
	'&.Mui-disabled': {
		backgroundColor: '#1976d2', // тот же цвет
		color: '#fff',
		opacity: 1, // убираем затемнение
		cursor: 'not-allowed', // можно оставить для UX
	},
}))

const searchSchema = z.object({
	search: z.string().min(2),
})

type Search = z.infer<typeof searchSchema>

export default function Search() {
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
		await new Promise<void>(res =>
			setTimeout(() => {
				res()
			}, 1000),
		)

		console.log(data.search)
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
							options={[]}
							value={field.value}
							onChange={(_, value) => field.onChange(value ?? '')}
							onInputChange={(_, value) => field.onChange(value)}
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
