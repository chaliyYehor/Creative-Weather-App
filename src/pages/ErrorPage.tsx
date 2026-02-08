import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function ErrorPage() {
	useGSAP(() => {
		gsap.from('.anim', {
			opacity: 0,
			y: 50,
			duration: 0.5,
			ease: 'power1.out',
			stagger: 0.1,
		})
	})

	return (
		<>
			<div className='errorWrapper w-full h-full flex flex-col justify-center items-center gap-10 text-center px-5'>
				<p className='anim text-gray-400 sm:text-2xl text-md'>404 Not Found</p>
				<h1 className='anim shakeAnim text-gray-100 sm:text-7xl text-4xl'>
					Oops! Page Not Found
				</h1>
				<p className='anim text-gray-400 sm:text-2xl text-md '>
					The page you are looking for doesn`t exist. Click <br /> button below
					to go to the homepage.
				</p>
				<Button
					className='anim'
					sx={{ width: '220px', height: '70px', fontSize: '1rem' }}
					variant='contained'
				>
					<Link to={'/'}>Back to Homepage</Link>
				</Button>
			</div>
		</>
	)
}
