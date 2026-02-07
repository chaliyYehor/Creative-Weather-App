import { zodResolver } from '@hookform/resolvers/zod'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'



const searchSchema = z.object({
	search: z.string().min(2),
})

type Search = z.infer<typeof searchSchema>

export default function Search() {
	const {
		register,
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<Search>({ resolver: zodResolver(searchSchema) })

	const onSubmit: SubmitHandler<Search> = async data => {
		await new Promise(res =>
			setTimeout(() => {
				res
			}, 1000),
		)

		console.log(data.search)
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name='search'
					control={control}
					defaultValue=''
					render={({ field }) => (
						<Autocomplete
							freeSolo
							options={[]}
							value={field.value}
							loading={isSubmitting}
							onChange={(_, value) => field.onChange(value)}
							onInputChange={(_, value) => field.onChange(value)}
							sx={{
								width: 320,
								'& .MuiInputBase-root': {
									backgroundColor: 'white',
									borderRadius: 2,
								},
							}}
							renderInput={params => (
								<TextField {...params} label='Weather in...' />
							)}
						/>
					)}
				/>
			</form>
		</>
	)
}
