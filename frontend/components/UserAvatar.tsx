import { getAvatarFallback } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function UserAvatar({
	name,
	image,
}: {
	name: string | null | undefined
	image?: string | null | undefined
}) {
	return (
		<Avatar>
			<AvatarImage src={image || ''} alt={name || ''} />
			<AvatarFallback>{getAvatarFallback(name)}</AvatarFallback>
		</Avatar>
	)
}
