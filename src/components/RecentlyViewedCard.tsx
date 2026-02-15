type RecentlyViewedCardProps = {
	text: string
}

const RecentlyViewedCard = ({ text }: RecentlyViewedCardProps) => {
	return (
		<div className='cardWrapper border-2 border-white/30 w-full h-20 rounded-sm text-2xl hover:border-white/50 transition'>
			{text}
		</div>
	)
}

export default RecentlyViewedCard
