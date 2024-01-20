'use client'

import { Poll } from '@/types'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function PollQuestions({ poll }: { poll: Poll }) {
	const [selectedQuestion, setSelectedQuestion] = useState(-1)
	return (
		<div className='flex flex-col gap-y-2 my-2'>
			{poll.questions.map((question) => (
				<div
					key={question.id}
					className='border py-2 px-4 rounded-sm relative hover:bg-accent transition-all duration-300 flex'
					onClick={() => {
						if (selectedQuestion === -1) {
							setSelectedQuestion(question.id)
						}
					}}
				>
					{question.question}
					{selectedQuestion != -1 && (
						<>
							<motion.div
								initial={{ width: 0 }}
								animate={{
									width: `${Math.random() * 100}%`,
								}}
								className='absolute inset-y-0 left-0 bg-primary/50 rounded-md'
							/>
							<div className='ml-auto flex gap-x-5'>
								{question.id === selectedQuestion && (
									<CheckCircle size={20} />
								)}
								50%
							</div>
						</>
					)}
				</div>
			))}
		</div>
	)
}
