import { forwardRef } from 'react'

const FadeOut = forwardRef<HTMLDivElement>((_, ref) => {
	return <>
		<div ref={ref} className="slicesWrapper pointer-events-none z-20 h-full w-full overflow-hidden absolute">
			<div />
			<div />
			<div />
			<div />
		</div>
	</>
})

export default FadeOut
