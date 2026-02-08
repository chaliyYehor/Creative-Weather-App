// import Snowfall from 'react-snowfall'
import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import Search from '#components/Search'
import Loader from '#components/Loader'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

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
			duration: 1,
			delay: 2
		}).to(loaderRef.current, {
			autoAlpha: 0,
			duration: 1,
		}, '<0.5')
	})

	return (
		<>
			<Loader ref={loaderRef} />
			<section className='mainSection w-screen h-screen overflow-hidden bg-[#01122e]'>
				<div className='backgroundEffect w-full h-full fixed pointer-events-none'>
					{/* <Snowfall snowflakeCount={40} /> */}
				</div>

				<header className='relative w-full min-h-30 flex justify-center items-center flex-col md:flex-row md:items-start md:justify-end mt-5'>
					<div className='logo md:absolute md:left-1/2 md:-translate-x-1/2 w-40 lg:w-60'>
						<img className='w-full h-full' src='/images/logo.svg' alt='' />
					</div>

					<div className='languageSelect flex items-center md:px-6'>
						<img src='/images/icons/ukraine.svg' alt='' />
						<MaterialUISwitch sx={{ m: 1 }} defaultChecked />
						<img src='/images/icons/unitedKingdom.svg' alt='' />
					</div>
				</header>

				<div className='chooseCity w-screen h-full flex flex-col justify-start pt-20 md:pt-50 items-center'>
					<Search />
				</div>
			</section>
		</>
	)
}
