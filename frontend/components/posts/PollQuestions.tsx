'use client'

import { useRequest } from '@/hooks/useRequest'
import { Poll, Question } from '@/types'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function PollQuestions({
	poll,
	postId,
}: {
	poll: Poll
	postId: number
}) {
	const [dynamicPoll, setDynamicPoll] = useState<Poll>(poll)
	const { send } = useRequest()
	const [percents, setPercents] = useState<number[]>([])

	useEffect(() => {
		if (dynamicPoll) {
			const totalVotes = dynamicPoll.questions.reduce(
				(acc: number, curr: Question) => {
					return acc + curr.count_votes
				},
				0
			)
			const percents = dynamicPoll.questions.map(
				(question: Question) => {
					return (question.count_votes / totalVotes) * 100
				}
			)
			setPercents(percents)
		}
		console.log({ dynamicPoll })
	}, [dynamicPoll])
	return (
		<div className='flex flex-col gap-y-2 my-2'>
			{poll.questions.map((question, index) => (
				<div
					key={question.id}
					className='border py-2 px-4 rounded-sm relative hover:bg-accent transition-all duration-300 flex'
					onClick={() => {
						send({
							url: `/posts/${postId}/vote`,
							method: 'POST',
							body: {
								vote: question.id,
							},
						})
							.then((r) => {
								setDynamicPoll(r.poll)
							})
							.catch((e) => {
								console.log({ e })
							})
					}}
				>
					{question.question}
					{dynamicPoll.user_selection != -1 && (
						<>
							<motion.div
								initial={{ width: 0 }}
								animate={{
									width: `${percents[index]}%`,
								}}
								className='absolute inset-y-0 left-0 bg-primary/50 rounded-md'
							/>
							<div className='ml-auto flex gap-x-5'>
								{question.id ===
									dynamicPoll.user_selection && (
									<CheckCircle size={20} />
								)}
								{percents[index]}%
							</div>
						</>
					)}
				</div>
			))}
		</div>
	)
}
