import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import weatherQueryOptions from '#queryOptions/weatherQueryOptions'
import FadeOut from '#components/FadeOut'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { findWeatherCondition } from '#utils/findWeatherCondition'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { RootType } from '#store/store'
import dayjs from 'dayjs'

const WeatherIn = () => {
	const lang = useSelector((state: RootType) => state.langSlice.lang)

	const { city } = useParams()
	const { data, isFetched } = useQuery(
		weatherQueryOptions(city as string, lang),
	)
	const weather = data?.current?.condition.text
	const localTime = data?.location?.localtime.split(' ')[1].split(':')[0]

	const url = findWeatherCondition(weather, localTime)

	const formatted = dayjs(data?.location.localtime).format('HH:mm - dddd, D MMM `YY')

	useEffect(() => {
		console.log(data)
	}, [data])

	useGSAP(() => {
		if (isFetched) {
			gsap.from('.slicesWrapper div', {
				x: 0,
				duration: 1,
				pointerEvents: 'all',
				stagger: 0.1,
				delay: 0.5,
				ease: 'power1.inOut',
			})
		}
	}, [isFetched])

	return (
		<>
			<FadeOut />
			<div
				style={{
					backgroundImage: `url(${url})`,
				}}
				className='weatherContainer w-full h-screen overflow-hidden flex justify-center items-start relative'
			>
				<nav className='w-full pl-29.25 pt-9.25 absolute'>
					<div className='logo w-22.5 h-11.75 select-none'>
						<Link to={'/'}>
							<img
								className='w-full h-full'
								src='/images/logo.svg'
								alt='logo'
							/>
						</Link>
					</div>
				</nav>

				<div className='mainInfoWrapper absolute left-29 bottom-21.25 flex items-center gap-2.5'>
					<div className='temp text-[143px]'>
						{data && Math.round(data?.current.temp_c)}°
					</div>
					<div className='generalInfo'>
						<h3 className='text-[60px]'>{data?.location.name}</h3>
						<p className='text-[18px] -mt-2.5'>{formatted}</p>
					</div>
					<div className='typeOfWeather w-27.5 h-27.5'>
						<img
							className='w-full h-full'
							src={data?.current.condition.icon}
							alt='weather icon'
						/>
					</div>
				</div>

				<div className='moreInfoWrapper absolute right-0 top-0 w-131.5 h-full '></div>
			</div>
		</>
	)
}

export default WeatherIn
