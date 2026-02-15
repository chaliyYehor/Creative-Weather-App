type RecentlyViewedCardProps = {
	place: string
}

const RecentlyViewedCard = ({ place }: RecentlyViewedCardProps) => {
	return (
		<div className='cardWrapper border-2 border-white/30 w-full h-20 rounded-sm text-2xl hover:border-white/50 transition grid gap-2 grid-cols-[60%_1fr_1fr]'>
			<div className='city flex items-center gap-5 pl-5 w-full h-full'>
				<h3>{place.includes('&') ? place.split('&')[0] : place}</h3>
			</div>

			<div className='icon w-full h-full flex justify-start items-center'>ic</div>

			<div className='temp w-full h-full flex items-center justify-center text-3xl'>
				18°
			</div>
		</div>
	)
}

export default RecentlyViewedCard
