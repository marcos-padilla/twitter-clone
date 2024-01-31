import { cn } from '@/lib/utils'
import UserAvatar from '../UserAvatar'
import { format } from 'date-fns'
import { Message } from '@/types'

export default function MessageBox({ message }: { message: Message }) {
	return (
		<div
			className={cn(
				'flex gap-3 p-4',
				message.is_owner && 'justify-end'
			)}
		>
			<div className={cn(message.is_owner && 'order-2')}>
				<UserAvatar
					name={message.sender.name}
					image={message.sender.avatar_path}
				/>
			</div>
			<div
				className={cn(
					'flex flex-col gap-2',
					message.is_owner && 'items-end'
				)}
			>
				<div className='flex items-center gap-1'>
					<div className='text-sm text-foreground/80'>
						{message.sender.name}
					</div>
					<div className='text-xs text-muted-foreground'>
						{format(new Date(message.created_at), 'p')}
					</div>
				</div>
				<div
					className={cn(
						'text-sm w-fit overflow-hidden',
						message.is_owner
							? 'bg-primary text-white'
							: 'bg-accent',
						false
							? 'rounded-md p-0'
							: 'rounded-full py-2 px-3'
					)}
				>
					{message.message}
				</div>
			</div>
		</div>
	)
}
