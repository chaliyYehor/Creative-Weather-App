import gsap from 'gsap'
import { useEffect, useRef } from 'react'

const FadeOut = () => {
	const wrapperRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const resetSlices = () => {
			if (!wrapperRef.current) return

			gsap.set(wrapperRef.current.children, {
				xPercent: -100,
				x: 0,
				pointerEvents: 'none',
			})
		}

		resetSlices()
		window.addEventListener('resize', resetSlices)
		return () => window.removeEventListener('resize', resetSlices)
	}, [])

	return (
		<div
			ref={wrapperRef}
			className='slicesWrapper pointer-events-none z-20 h-full w-full overflow-hidden absolute'
		>
			<div />
			<div />
			<div />
			<div />
		</div>
	)
}

export default FadeOut
