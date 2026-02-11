import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import weatherQueryOptions from '#queryOptions/weatherQueryOptions'
import { useEffect } from 'react'

const WeatherIn = () => {
	const { city } = useParams()
	const { data, isPending } = useQuery(weatherQueryOptions(city as string))

	useEffect(() => {
		console.log(data)
	}, [data])

	return (
		<div className='text-5xl text-white'>
			{isPending ? 'pending' : 'hell nah'}
		</div>
	)
}

export default WeatherIn
