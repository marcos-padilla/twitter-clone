import { cn, getAvatarFallback } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function UserAvatar({
	name,
	image,
	size,
}: {
	name: string | null | undefined
	image?: string | null | undefined
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}) {
	return (
		<Avatar
			className={cn(
				'h-10 w-10',
				size === 'md' && 'h-14 w-14',
				size === 'lg' && 'h-20 w-20',
				size === 'xl' && 'h-36 w-36'
			)}
		>
			<AvatarImage src={image || ''} alt={name || ''} />
			<AvatarFallback
				className={cn(
					size === 'xl' && 'text-5xl',
					size === 'lg' && 'text-3xl',
					size === 'md' && 'text-xl',
					size === 'sm' && 'text-lg',
					size === 'xs' && 'text-md'
				)}
			>
				{getAvatarFallback(name)}
			</AvatarFallback>
		</Avatar>
	)
}
