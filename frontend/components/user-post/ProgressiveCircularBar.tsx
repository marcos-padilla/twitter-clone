import { cn } from '@/lib/utils'

export default function ProgressiveCircularBar({
	actual,
	limit,
}: {
	actual: number
	limit: number
}) {
	const radius = 20
	const percentage = (actual / limit) * 100
	const circumference = radius * 2 * Math.PI
	const offset = circumference - (percentage / 100) * circumference
	return (
		<div className='relative w-[80px] h-[80px]'>
			<svg className='-rotate-90' height='80' width='80'>
				<circle
					className={'stroke-accent'}
					strokeWidth='4'
					fill='transparent'
					r={radius}
					cx='40'
					cy='40'
				/>
				<circle
					className={cn(
						`stroke-primary transition-all duration-500 ease-in-out`,
						percentage >= 75 && 'stroke-orange-500',
						percentage >= 90 && 'stroke-red-500',
						percentage >= 100 && 'stroke-red-800'
					)}
					strokeWidth='4'
					fill='transparent'
					r={radius}
					cx='40'
					cy='40'
					style={{
						strokeDasharray: `${circumference} ${circumference}`,
						strokeDashoffset: offset,
					}}
				/>
			</svg>
			<span
				className={cn(
					'absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm',
					percentage >= 75 && 'text-orange-500',
					percentage >= 90 && 'text-red-500',
					percentage >= 100 && 'text-red-800'
				)}
			>
				{limit - actual}
			</span>
		</div>
	)
}
