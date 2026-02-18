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

	const formatted = dayjs(data?.location.localtime)
		.locale(languageUsed === 'en' ? 'en' : 'uk')
		.format('HH:mm - dddd, D MMM YY')

	useEffect(() => {
		console.log(data)
	}, [data])

	useGSAP(() => {
		if (isFetched && navigatedFrom === 'homePage') {
			gsap.fromTo(
				'.slicesWrapper div',
				{ xPercent: 0, x: 0, pointerEvents: 'all' },
				{
					xPercent: -100,
					x: 0,
					pointerEvents: 'none',
					duration: 1,
					stagger: 0.1,
					delay: 0.5,
					ease: 'power1.inOut',
				},
			)
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
				<div className='searchWrapper lg:hidden flex absolute right-5 top-4 z-10'>
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

				<nav className='w-full pl-5 pt-5 lg:pt-9.25 lg:pl-29.25 absolute'>
					<div className='logo w-9.75 h-5 sm:w-12 sm:h-7 lg:w-22.5 lg:h-11.75 select-none'>
						<Link to={'/'} onClick={() => reset()}>
							<img
								className='w-full h-full'
								src='/images/logo.svg'
								alt='logo'
							/>
						</Link>
					</div>
				</nav>

				<div className='mainInfoWrapper absolute left-5 sm:left-8 lg:left-5 xl:left-29 top-[25vh] sm:top-[15vh] lg:top-[65vh] flex items-center gap-2.5 h-fit'>
					<div className='temp text-[48px] sm:text-[110px] lg:text-[130px]'>
						{data && Math.round(data?.current.temp_c)}°
					</div>
					<div className='generalInfo flex flex-col gap-1'>
						<h3 className='text-[20px] sm:text-[48px] lg:text-[60px]'>
							{cityName ? cityName : data?.location.name}
						</h3>
						<p className='text-[10px] sm:text-[16px] lg:text-[18px] -mt-2.5'>
							{formatted}
						</p>
					</div>
					<div className='typeOfWeather w-10 h-10 sm:w-20 sm:h-20'>
						<img
							className='w-full h-full'
							src={data?.current.condition.icon}
							alt='weather icon'
						/>
					</div>
				</div>

				<div className='moreInfoWrapper lg:pt-10 flex flex-col items-center absolute bottom-0 lg:top-0 right-0 lg:right-0 w-full lg:w-[40vw] h-[60vh] lg:h-full overflow-x-auto'>
					<div className='searchWrapper lg:flex lg:visible hidden z-10'>
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

					<div className='content mt-13.75 flex flex-col items-center text-[14px] text-white w-[80%] sm:max-w-97.5'>
						<h4 className='mb-9.25 sm:text-[18px]'>
							{languageUsed === 'en'
								? 'Weather Details...'
								: 'Деталі про погоду...'}
						</h4>
						<h3 className='uppercase mb-7.5 text-center sm:text-[18px]'>
							{data?.forecast.forecastday[0].day.condition.text}
						</h3>

						<section className='current sm:text-[18px] pb-19.5 flex flex-col gap-7.5 w-full border-b-2 border-white'>
							<div className='tempMin flex justify-between'>
								<div>
									<p>{languageUsed === 'en' ? 'Temp max' : 'Макс темп'}</p>
								</div>
								<div className='infoWrapper'>
									<p>
										{data?.forecast &&
											Math.round(data?.forecast.forecastday[0].day.maxtemp_c)}
										°
									</p>
									<ThermometerSun color='#DFA1A1' />
								</div>
							</div>
							<div className='tempMax'>
								<div>
									<p>{languageUsed === 'en' ? 'Temp min' : 'Мін темп'}</p>
								</div>

								<div className='infoWrapper'>
									<p>
										{data?.forecast &&
											Math.round(data?.forecast.forecastday[0].day.mintemp_c)}
										°
									</p>
									<ThermometerSnowflake color='#6D97CA' />
								</div>
							</div>

							<div className='humidity'>
								<div>
									<p>{languageUsed === 'en' ? 'Humidity' : 'Вологість'}</p>
								</div>

								<div className='infoWrapper'>
									<p>{data?.forecast.forecastday[0].day.avghumidity}%</p>
									<Droplet />
								</div>
							</div>
							<div className='Cloudy'>
								<div>
									<p className='capitalize'>
										{languageUsed === 'en' ? 'Cloudy' : 'хмарність'}
									</p>
								</div>

								<div className='infoWrapper'>
									<p>{localTime && data?.current.cloud}%</p>
									<Cloud />
								</div>
							</div>
							<div className='Wind'>
								<div>
									<p>{languageUsed === 'en' ? 'Wind' : 'Вітер'}</p>
								</div>

								<div className='infoWrapper'>
									<p>
										{data?.current && Math.round(data?.current.wind_kph)}
										{languageUsed === 'en' ? ' km/h' : ' км/год'}
									</p>
									<Wind />
								</div>
							</div>
						</section>

						<h4 className='mb-14 mt-10.25 sm:text-[18px] font-normal'>
							{languageUsed === 'en'
								? "Today's Weather Forecast..."
								: 'Сьогоднішній прогноз погоди...'}
						</h4>

						<section className='todaysForecast w-full flex overflow-auto mb-10'>
							{data?.forecast.forecastday[0].hour.map((hourData, idx) => {
								let time = ''
								if (idx <= 9) {
									time = `0${idx}`
								} else if (localTime && idx === +localTime) {
									time = languageUsed === 'en' ? 'Now' : 'Зараз'
								} else {
									time = idx
								}

								return (
									<div
										className='w-20 shrink-0 flex flex-col justify-center items-center gap-2'
										key={idx}
									>
										<p className='font-bold text-xl'>
											{time}
										</p>
										<img src={hourData.condition.icon} alt='weather type' />
										<p className='font-bold text-xl'>{hourData.temp_c}</p>
									</div>
								)
							})}
						</section>
					</div>
				</div>
			</div>
		</>
	)
}

export default WeatherIn
