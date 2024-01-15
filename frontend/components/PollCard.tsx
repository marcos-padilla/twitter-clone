import { PollInput } from '@/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Minus, Plus } from 'lucide-react'
import ActionTooltip from './ActionTooltip'
import { useToast } from './ui/use-toast'

export default function PollCard({
	poll,
	setPoll,
}: {
	poll: PollInput | null
	setPoll: (poll: PollInput | null) => void
}) {
	const { toast } = useToast()
	if (!poll) return null
	return (
		<Card>
			<CardHeader>
				<CardTitle>Poll</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				{poll.questions.map((question, index) => (
					<div className='flex items-center gap-x-2' key={index}>
						<Input
							key={index}
							value={question}
							onChange={(e) => {
								const newPoll = { ...poll }
								newPoll.questions[index] =
									e.target.value
								setPoll(newPoll)
							}}
							placeholder={`Choice ${index + 1}`}
							required={true}
						/>
						{index > 1 && (
							<ActionTooltip label='Remove' size='xs'>
								<Button
									variant={'ghost'}
									size={'icon'}
									className='w-5 h-5 text-destructive'
									onClick={() => {
										const newPoll = { ...poll }
										newPoll.questions.splice(
											index,
											1
										)
										setPoll(newPoll)
									}}
								>
									<Minus />
								</Button>
							</ActionTooltip>
						)}
					</div>
				))}
				<div className='flex justify-end'>
					<ActionTooltip label='Add question'>
						<Button
							size={'icon'}
							className='rounded-full'
							disabled={poll.questions.length >= 5}
							onClick={() => {
								if (poll.questions.length >= 5) {
									toast({
										title: 'Max questions reached',
										description:
											'You can only have 5 questions per poll',
									})
								} else {
									const newPoll = { ...poll }
									newPoll.questions.push('')
									setPoll(newPoll)
								}
							}}
						>
							<Plus />
						</Button>
					</ActionTooltip>
				</div>
			</CardContent>
			<CardFooter
				className='hover:bg-destructive/40 rounded-bl-md rounded-br-md flex items-center justify-center py-4 cursor-pointer border-t transition-colors'
				onClick={() => setPoll(null)}
			>
				<span className='text-lg text-destructive'>
					Remove Poll
				</span>
			</CardFooter>
		</Card>
	)
}
