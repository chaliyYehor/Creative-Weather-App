// import Snowfall from 'react-snowfall'
import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import Search from '#components/Search'
import Loader from '#components/Loader'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FadeOut from '#components/FadeOut'

const size = 1.3

const MaterialUISwitch = styled(Switch)(() => ({
	width: 70 * size,
	height: 36 * size,
	padding: 7 * size,

	'& .MuiSwitch-switchBase': {
		margin: 1 * size,
		padding: 0,
		transform: `translateX(${2 * size}px)`,

		'&.Mui-checked': {
			transform: `translateX(${34 * size}px)`,

			'& .MuiSwitch-thumb::before': {
				content: '"EN"',
			},

			'& + .MuiSwitch-track': {
				backgroundColor: '#aab4be',
			},
		},
	},

	'& .MuiSwitch-thumb': {
		backgroundColor: '#001e3c',
		width: 32 * size,
		height: 32 * size,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 12 * size,
		fontWeight: 700,
		color: '#fff',

		'&::before': {
			content: '"UK"',
		},
	},

	'& .MuiSwitch-track': {
		opacity: 1,
		borderRadius: 20 * size,
		backgroundColor: '#aab4be',
	},
}))

export default function Main() {
	const loaderRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const tl = gsap.timeline()

		tl.to(loaderRef.current!.children[0], {
			autoAlpha: 0,
			duration: 0.1,
			delay: 0,
		})
			.to(
				loaderRef.current,
				{
					autoAlpha: 0,
					duration: 1,
				},
				'<0.5',
			)
			.from('.logo', {
				y: -30,
				opacity: 0,
				duration: 1.5,
				ease: 'power1.out',
			}, '<0.5')
			.from(
				'.chooseCity',
				{
					y: 40,
					opacity: 0,
					duration: 1.5,
					ease: 'power1.out',
				},
				'<0.5',
			)
	})

	return (
		<>
			<Loader ref={loaderRef} />
			<FadeOut />
			<section className='mainSection w-full h-full overflow-hidden bg-[#01122e]'>
				<div className='backgroundEffect w-full h-full fixed pointer-events-none'>
					{/* <Snowfall snowflakeCount={60} /> */}
				</div>

				<header className='relative w-full min-h-30 flex justify-center items-center flex-col md:flex-row md:items-start md:justify-end mt-5 md:mt-10'>
					<div className='logo md:absolute md:left-1/2 md:-translate-x-1/2 w-40 lg:w-60'>
						<img className='w-full h-full' src='/images/logo.svg' alt='logo' />
					</div>

					<div className='languageSelect flex items-center md:px-6'>
						<img src='/images/icons/ukraine.svg' alt='Ukraine icon' />
						<MaterialUISwitch sx={{ m: 1 }} defaultChecked />
						<img src='/images/icons/unitedKingdom.svg' alt='UK icon' />
					</div>
				</header>

				<div className='chooseCity w-full h-full flex flex-col justify-start pt-20 md:pt-50 items-center'>
					<Search />
				</div>
			</section>
		</>
	)
}
