import { SearchContext } from '#constants/searchContext'
import type { Search } from '#types/form'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { useLocalStorage } from '@uidotdev/usehooks'
import gsap from 'gsap'
import { Search as SearchIcon } from 'lucide-react'
import { useContext } from 'react'
import { useFormContext, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
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

	const ctx = useContext(SearchContext)

	if (!ctx) {
		throw new Error('SearchContext must be used within SearchContext.Provider')
	}
	const { latLon, isLarge, isSmall, isOptionSelected } = ctx

	const [_, setPlaces] = useLocalStorage<string[]>('places', [])

	const navigate = useNavigate()

	const {
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useFormContext<Search>()

	const onSubmit: SubmitHandler<Search> = async data => {
		;(document.activeElement as HTMLElement)?.blur()

		gsap.to('.slicesWrapper div', {
			xPercent: 0,
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
		const formatedDataStorage = `${formatedData}&${latLon}`

		navigate(`/weatherin/${formatedData}&${latLon}&homePage&${lang}`)

		setPlaces(places => {
			return formatedDataStorage === places[places.length - 1]
				? [...places]
				: [...places, `${formatedDataStorage}&${lang}`]
		})

		reset()
	}

	const buttonText = lang === 'en' ? 'Search' : 'Пошук'

	return (
		<>
			<form
				className={
					'searchForm flex flex-col sm:flex-row justify-center items-center gap-5'
				}
				onSubmit={handleSubmit(onSubmit)}
			>
				<SearchInput typeOfInput={'homePage'} />

				<div className='search'>
					<StyledSubmitButton
						disabled={!isOptionSelected || isSubmitting}
						sx={{ height: '50px', fontSize: '1.1rem', borderRadius: '25px' }}
						variant='contained'
						startIcon={isLarge || isSmall ? <SearchIcon /> : ''}
						type='submit'
					>
						{isLarge || isSmall ? buttonText : <SearchIcon />}
					</StyledSubmitButton>
				</div>
			</form>
		</>
	)
}
