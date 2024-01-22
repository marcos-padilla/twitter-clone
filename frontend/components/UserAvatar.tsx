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
				size === 'lg' && 'h-14 w-14',
				size === 'xl' && 'h-20 w-20'
			)}
		>
			<AvatarImage src={image || ''} alt={name || ''} />
			<AvatarFallback>{getAvatarFallback(name)}</AvatarFallback>
		</Avatar>
	)
}
