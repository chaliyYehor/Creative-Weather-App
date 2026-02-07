import { zodResolver } from '@hookform/resolvers/zod'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'
import { Search as SearchIcon } from 'lucide-react'
import Button from '@mui/material/Button'

const size = 1.3

const StyledAutocomplete = styled(Autocomplete)(() => ({
	width: 320 * size,

	/* input wrapper */
	'& .MuiInputBase-root': {
		backgroundColor: '#fff',
		borderRadius: 5,
		paddingLeft: 14 * size,
	},

	/* сам input */
	'& .MuiInputBase-input': {
		color: '#001e3c',
		fontSize: 14 * size,
		padding: `${10 * size}px 8 * size}px`,
	},

	/* placeholder / label */
	'& label': {
		color: 'black',
	},
}))

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
				className='flex justify-center items-center gap-5'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Controller
					name='search'
					control={control}
					defaultValue=''
					render={({ field }) => (
						<StyledAutocomplete
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
						startIcon={<SearchIcon />}
						type='submit'
					>
						Search
					</StyledSubmitButton>
				</div>
			</form>
		</>
	)
}
