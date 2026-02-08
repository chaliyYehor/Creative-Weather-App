import dayjs from 'dayjs'
import clsx from 'clsx'
import { forwardRef } from 'react'

const Loader = forwardRef<HTMLDivElement>((_, ref) => {
	function getDayOrNight() {
		const hour = dayjs().hour()

		if (hour >= 6 && hour < 18) {
			return 'day'
		} else {
			return 'night'
		}
	}

	return (
		<div
			ref={ref}
			className='loader-wrapper bg-[#01122e] fixed inset-0 z-10 flex justify-center items-center'
		>
			<div
				className={clsx({
					'loader-day': getDayOrNight() === 'day',
					'loader-night': getDayOrNight() === 'night',
				})}
			></div>
		</div>
	)
})

export default Loader
