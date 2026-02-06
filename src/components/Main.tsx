import Snowfall from 'react-snowfall'
import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'

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
	return (
		<section className='mainSection w-screen h-screen overflow-hidden bg-[#01122e]'>
			<div className='backgroundEffect w-full h-full fixed'>
				{/* <Snowfall snowflakeCount={40} /> */}
			</div>

			<header className='z-1'>
				<div className='logo'>
					<img src='/images/logo.svg' alt='' />
				</div>
				<div className='languageSelect'>
					<MaterialUISwitch sx={{ m: 1 }} defaultChecked />
				</div>
			</header>

			<div className='chooseCity z-1'></div>
		</section>
	)
}
