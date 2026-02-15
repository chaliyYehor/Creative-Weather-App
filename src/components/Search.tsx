import { styled } from '@mui/material/styles'
import { useDebounce } from '@uidotdev/usehooks'
import { useFormContext, type SubmitHandler } from 'react-hook-form'
import { Search as SearchIcon } from 'lucide-react'
import Button from '@mui/material/Button'
import useMediaQuery from '@mui/material/useMediaQuery'
import gsap from 'gsap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Search } from '#types/form'
import SearchInput from './SearchInput'
import { useSelector } from 'react-redux'
import type { RootType } from '#store/store'

const StyledSubmitButton = styled(Button)(() => ({
	'&.Mui-disabled': {
		backgroundColor: '#1976d2',
		color: '#fff',
		opacity: 1,
		cursor: 'not-allowed',
	},
}))

export default function Search() {
	const lang = useSelector((state: RootType) => state.langSlice.lang)

	const navigate = useNavigate()

	const [latLon, setLatLon] = useState('')
	const [isOptionSelected, setIsOptionSelected] = useState(false)
	const [value, setValue] = useState('')
	const debouncedSearchTerm = useDebounce(value, 300)

	const isExtraSm = useMediaQuery('(max-width:355px)')
	const isSmall = useMediaQuery('(max-width:600px)')
	const isLarge = useMediaQuery('(min-width:1025px)')

	let scale = 1.3

	if (isExtraSm) scale = 0.8
	else if (isSmall) scale = 1

	const {
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useFormContext<Search>()

	const onSubmit: SubmitHandler<Search> = async data => {
		;(document.activeElement as HTMLElement)?.blur()

		gsap.to('.slicesWrapper div', {
			x: 0,
			duration: 1,
			pointerEvents: 'all',
			stagger: 0.1,
			delay: 0.3,
			ease: 'power1.inOut',
		})

		//sleepTimeForTheAnimation
		await new Promise(res => setTimeout(res, 1500))

		const formatedData = data.search.split(',')[0]

		if (lang === 'en') {
			navigate(`/weatherIn/${formatedData}`)
		} else {
			navigate(`/weatherin/${latLon}&${formatedData}`)
		}

		reset()
	}

	return (
		<>
			<form
				className={
					'flex flex-col sm:flex-row justify-center items-center gap-5'
				}
				onSubmit={handleSubmit(onSubmit)}
			>
				<SearchInput
					debouncedValue={debouncedSearchTerm}
					scale={scale}
					setIsOptionSelected={setIsOptionSelected}
					setValue={setValue}
					setLatLon={setLatLon}
					typeOfInput={'homePage'}
				/>

				<div className='search'>
					<StyledSubmitButton
						disabled={!isOptionSelected || isSubmitting}
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
