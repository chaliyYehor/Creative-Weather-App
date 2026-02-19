import type { RootType } from '#store/store'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import weatherQueryOptions from '#queryOptions/weatherQueryOptions'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

type RecentlyViewedCardProps = {
	place: string
}

const RecentlyViewedCard = ({ place }: RecentlyViewedCardProps) => {
	const navigate = useNavigate()
	const lang = useSelector((state: RootType) => state.langSlice.lang)

	const city = place.includes('&') ? place.split('&')[1] : place

	async function getMoreInfo() {
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

		const latLon = place.includes('&') && place.split('&')[1]
		const languageUsed = place.split('&')[2]
		const properUrl = `${place.split('&')[0]}&${latLon}`

		navigate(`/weatherIn/${properUrl}&homePage&${languageUsed}`)
	}

	const { data } = useQuery(weatherQueryOptions(city as string, lang))

	return (
		<div
			onClick={() => getMoreInfo()}
			className='cardWrapper border-2 border-white/30 w-full h-15 md:h-20 rounded-sm text-xl md:text-3xl hover:border-white/50 transition grid gap-2 grid-cols-[60%_1fr_1fr] cursor-pointer overflow-hidden'
		>
			<div className='city flex items-center gap-5 pl-5 w-full h-full'>
				<h3>{place.includes('&') ? place.split('&')[0] : place}</h3>
			</div>

			<div className='icon w-full h-full flex justify-start items-center'>
				<img className='w-full' src={data?.current.condition.icon} alt='weathter type' />
			</div>

			<div className='temp w-full h-full  pr-5 flex items-center justify-center text-2xl md:text-3xl'>
				{`${data?.current && Math.round(data?.current.temp_c)}°`}
			</div>
		</div>
	)
}

export default RecentlyViewedCard
