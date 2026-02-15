import { Trash } from 'lucide-react'
import RecentlyViewedCard from './RecentlyViewedCard'
import { useLocalStorage } from '@uidotdev/usehooks'

const RecentlyViewed = () => {
	const [places, setPlaces] = useLocalStorage<string[]>('places', [])
	console.log(places)

	return (
		<>
			<div className='recentlyViewedWrapper text-white max-w-100 px-5 flex flex-col items-center mt-5 sm:mt-10 md:mt-15 max-h-100 overflow-hidden gap-2 md:gap-5 relative'>
				<h3 className='text-xl md:text-3xl'>Recently Viewed</h3>

				<div onClick={() => setPlaces([])} className="clearAll md:text-white/50 text-white hover:md:text-white transition w-fit h-fit absolute right-5 top-0 md:top-2 cursor-pointer" title='Clear all'>
					<Trash />
				</div>

				<div className='listWrapper h-full overflow-auto w-full pb-50 md:pb-20 pt-2'>
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
