import { getAvatarFallback } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function UserAvatar({
	name,
	image,
}: {
	name: string
	image?: string | null
}) {
	return (
		<Avatar>
			<AvatarImage src={image || ''} alt={name} />
			<AvatarFallback>{getAvatarFallback(name)}</AvatarFallback>
		</Avatar>
	)
}
