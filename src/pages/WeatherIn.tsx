import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import weatherQueryOptions from '#queryOptions/weatherQueryOptions'
import FadeOut from '#components/FadeOut'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { findWeatherCondition } from '#utils/findWeatherCondition'
import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootType } from '#store/store'
import dayjs from 'dayjs'
import 'dayjs/locale/uk'
import SearchInput from '#components/SearchInput'
import {
	Cloud,
	Droplet,
	SearchIcon,
	ThermometerSnowflake,
	ThermometerSun,
	Wind,
} from 'lucide-react'
import { SearchContext } from '#constants/searchContext'
import { useFormContext } from 'react-hook-form'
import type { Search } from '#types/form'
import { useLocalStorage } from '@uidotdev/usehooks'

const WeatherIn = () => {
	const [_, setPlaces] = useLocalStorage<string[]>('places', [])

	const { reset } = useFormContext<Search>()

	const navigate = useNavigate()

	const [searchValue, setSearchValue] = useState('')

	const ctx = useContext(SearchContext)
	if (!ctx) {
		throw new Error('SearchContext is not provided')
	}
	const { isOptionSelected, latLon } = ctx

	const lang = useSelector((state: RootType) => state.langSlice.lang)

	const pageId = useParams()

	const pageData = pageId.city?.split('&')
	const cityName = pageData?.[0]
	const cityLatLon = pageData?.[1]
	const navigatedFrom = pageData?.[2]
	const languageUsed = pageData?.[3] ?? lang

	const { data, isFetched } = useQuery(
		weatherQueryOptions(cityLatLon as string, languageUsed as 'uk' | 'en'),
	)
	const weather = data?.current?.condition.text
	const localTime = data?.location?.localtime.split(' ')[1].split(':')[0]

	const url = findWeatherCondition(weather, localTime)

	console.log(weather)

	const formatted = dayjs(data?.location.localtime)
		.locale(languageUsed === 'en' ? 'en' : 'uk')
		.format('HH:mm - dddd, D MMM YY')

	useEffect(() => {
		console.log(data)
	}, [data])

	useGSAP(() => {
		if (isFetched && navigatedFrom === 'homePage') {
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

	function submit() {
		if (!searchValue) return

		const formatedData = searchValue.split(',')[0]
		const formatedDataStorage = `${formatedData}&${latLon}`

		console.log(`formatted data for LS: ${formatedDataStorage}`)

		navigate(`/weatherin/${formatedData}&${latLon}&weatherPage`)

		setPlaces(places => {
			return formatedDataStorage === places[places.length - 1]
				? [...places]
				: [...places, `${formatedDataStorage}&${lang}`]
		})
	}

	return (
		<>
			<FadeOut />

			<div
				style={{
					backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)),
    url(${url})`,
				}}
				className='weatherContainer w-full h-screen overflow-hidden flex justify-center items-start relative'
			>
				<div className='searchWrapper flex absolute right-5 top-4 z-10'>
					<SearchInput
						setNeededValue={setSearchValue}
						typeOfInput='weatherPage'
					/>

					<button
						className='cursor-pointer'
						onClick={submit}
						disabled={!isOptionSelected}
					>
						<SearchIcon color='white' />
					</button>
				</div>

				<nav className='w-full pl-5 pt-5 absolute'>
					<div className='logo w-9.75 h-5 select-none'>
						<Link to={'/'} onClick={() => reset()}>
							<img
								className='w-full h-full'
								src='/images/logo.svg'
								alt='logo'
							/>
						</Link>
					</div>
				</nav>

				<div className='mainInfoWrapper absolute left-5 top-[25vh] flex items-center gap-2.5'>
					<div className='temp text-[48px]'>
						{data && Math.round(data?.current.temp_c)}°
					</div>
					<div className='generalInfo flex flex-col gap-1'>
						<h3 className='text-[20px]'>
							{cityName ? cityName : data?.location.name}
						</h3>
						<p className='text-[10px] -mt-2.5'>{formatted}</p>
					</div>
					<div className='typeOfWeather w-10 h-10'>
						<img
							className='w-full h-full'
							src={data?.current.condition.icon}
							alt='weather icon'
						/>
					</div>
				</div>

				<div className='moreInfoWrapper flex flex-col items-center absolute bottom-0 left-0 w-full h-[60vh] overflow-x-auto'>
					<div className='content mt-13.75 flex flex-col items-center text-[14px] text-white w-[80%]'>
						<h4 className='mb-9.25'>Weather Details...</h4>
						<h3 className='uppercase mb-7.5 text-center'>
							Thunderstorm with a little drizzle
						</h3>

						<div className='current pb-19.5 flex flex-col gap-7.5 w-full border-b-2 border-white'>
							<div className='tempMin flex justify-between'>
								<div>
									<p>Temp max</p>
								</div>
								<div className='infoWrapper'>
									<p>19°</p>
									<ThermometerSun color='#DFA1A1' />
								</div>
							</div>
							<div className='tempMax'>
								<div>
									<p>Temp min</p>
								</div>

								<div className='infoWrapper'>
									<p>15°</p>
									<ThermometerSnowflake color='#6D97CA' />
								</div>
							</div>

							<div className='humidity'>
								<div>
									<p>Humidity</p>
								</div>

								<div className='infoWrapper'>
									<p>58%</p>
									<Droplet />
								</div>
							</div>
							<div className='Cloudy'>
								<div>
									<p>Cloudy</p>
								</div>

								<div className='infoWrapper'>
									<p>86%</p>
									<Cloud />
								</div>
							</div>
							<div className='Wind'>
								<div>
									<p>Wind</p>
								</div>

								<div className='infoWrapper'>
									<p>5km/h</p>
									<Wind />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default WeatherIn
