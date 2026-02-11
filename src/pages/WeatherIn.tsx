import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import weatherQueryOptions from '#queryOptions/weatherQueryOptions'
import FadeOut from '#components/FadeOut'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const WeatherIn = () => {
	const { city } = useParams()
	const { data, isFetched } = useQuery(weatherQueryOptions(city as string))

	useGSAP(() => {
		if (isFetched) {
			gsap.from('.slicesWrapper div', {
				x: 0,
				duration: 1,
				stagger: 0.1,
				delay: 0.3,
				ease: 'power1.inOut',
			})
		}
	}, [isFetched])

	return (
		<>
			<FadeOut />
		</>
	)
}

export default WeatherIn
