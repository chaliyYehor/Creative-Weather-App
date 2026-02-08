import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
	return (
		<>
			<div className='errorWrapper w-full h-screen flex flex-col justify-center items-center gap-10 text-center px-5'>
				<p className='text-gray-400 sm:text-2xl text-md'>404 Not Found</p>
				<h1 className='text-gray-100 sm:text-7xl text-4xl'>Oops! Page Not Found</h1>
				<p className='text-gray-400 sm:text-2xl text-md '>
					The page you are looking for doesn`t exist. Click <br /> button below
					to go to the homepage.
				</p>
				<Button sx={{width: '220px', height: '70px', fontSize: '1rem'}} variant='contained'>
					<Link to={'/'}>Back to Homepage</Link>
				</Button>
			</div>
		</>
	)
}
