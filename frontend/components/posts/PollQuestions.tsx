'use client'

import { useRequest } from '@/hooks/useRequest'
import { vote } from '@/lib/actions'
import { Poll, Question } from '@/types'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function PollQuestions({ poll }: { poll: Poll }) {
	const [actualPoll, setActualPoll] = useState<Poll>(poll)
	const { send } = useRequest()
	return (
		<div className='flex flex-col gap-y-2 my-2'>
			{actualPoll.questions.map((question, index) => (
				<div
					key={question.id}
					className='border py-2 px-4 rounded-sm relative hover:bg-accent transition-all duration-300 flex'
					onClick={() => {
						vote(actualPoll.id, question.id)
							.then((res) => {
								setActualPoll(res.poll)
							})
							.catch((e) => {
								console.log({ e })
							})
					}}
				>
					{question.question}
					{actualPoll.user_selection != -1 && (
						<>
							<motion.div
								initial={{ width: 0 }}
								animate={{
									width: `${question.percentage_votes}%`,
								}}
								className='absolute inset-y-0 left-0 bg-primary/50 rounded-md'
							/>
							<div className='ml-auto flex gap-x-5'>
								{question.id ===
									actualPoll.user_selection && (
									<CheckCircle size={20} />
								)}
								{question.percentage_votes}%
							</div>
						</>
					)}
				</div>
			))}
		</div>
	)
}
