'use client'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface ActionTooltipProps {
	label: string
	children: React.ReactNode
	side?: 'top' | 'right' | 'bottom' | 'left'
	align?: 'start' | 'center' | 'end'
	size?: 'lg' | 'md' | 'sm' | 'xs'
}

export default function ActionTooltip({
	label,
	children,
	side,
	align,
	size,
}: ActionTooltipProps) {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={50}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					side={side}
					align={align}
					style={{ zIndex: 999 }}
				>
					<span
						className={cn(
							'font-semibold',
							size ? `text-${size}` : 'text-sm'
						)}
					>
						{label}
					</span>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
