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

const WeatherIn = () => {
	const lang = useSelector((state: RootType) => state.langSlice.lang)

	const { city } = useParams()
	const { data, isFetched } = useQuery(
		weatherQueryOptions(city as string, lang),
	)
	const weather = data?.current?.condition.text
	const localTime = data?.location?.localtime.split(' ')[1].split(':')[0]

	const url = findWeatherCondition(weather, localTime)

	useEffect(() => {
		console.log(data)
	}, [data])

	useGSAP(() => {
		if (isFetched) {
			gsap.from('.slicesWrapper div', {
				x: 0,
				duration: 1,
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
				<nav>
					<div className='logo'>
						<Link to={'/'}>
							<img src='/images/logo.svg' alt='logo' />
						</Link>
					</div>
				</nav>

				<div className='mainInfoWrapper'></div>

				<div className='moreInfoWrapper w-131.5'></div>
			</div>
		</>
	)
}

export default WeatherIn
