import { Link } from 'react-router-dom'

export default function ErrorPage() {
	return (
		<>
			<p>404 Not Found</p>
			<h1>Oops! Page Not Found</h1>
			<p>The page you are looking for doesn`t exist. Click button below to go to the homepage.</p>

			<Link to={'/'}/>
		</>
	)
}
