import { Trash } from 'lucide-react'
import RecentlyViewedCard from './RecentlyViewedCard'
import { useLocalStorage } from '@uidotdev/usehooks'

const RecentlyViewed = () => {
	const [places, setPlaces] = useLocalStorage<string[]>('places', [])
	console.log(places)

	return (
		<>
			<div className='recentlyViewedWrapper text-white w-100 flex flex-col items-center mt-20 max-h-100 overflow-hidden gap-8 relative'>
				<h3 className='text-3xl'>Recently Viewed</h3>

				<div onClick={() => setPlaces([])} className="clearAll text-white/50 hover:text-white transition w-fit h-fit absolute right-0 top-2 cursor-pointer" title='Clear all'>
					<Trash />
				</div>

				<div className='listWrapper h-full overflow-auto w-full'>
					<ul className='flex flex-col gap-2'>
						{places.reverse().map((place, index) => (
							<RecentlyViewedCard key={index} place={place} />
						))}
					</ul>
				</div>
			</div>
		</>
	)
}

export default RecentlyViewed
