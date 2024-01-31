'use client'

import { Send } from 'lucide-react'
import MessageBox from './chat/MessageBox'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { useEffect, useRef, useState } from 'react'
import { sendMessage } from '@/lib/actions'
import { Message } from '@/types'
import { set } from 'date-fns'

export default function Chat({
	username,
	initialMessages,
}: {
	username: string
	initialMessages: Message[]
}) {
	const [input, setInput] = useState('')
	const [messages, setMessages] = useState(initialMessages)
	const messageListRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (messageListRef.current) {
			console.log(messageListRef.current.scrollHeight)

			messageListRef.current.scrollTop =
				messageListRef.current.scrollHeight
		}
	}, [messages, messageListRef])

	const onSubmit = async () => {
		if (!input || !username) return
		sendMessage(username, input)
			.then((r) => {
				setInput('')
				setMessages((messages) => [...messages, r])
			})
			.catch((e) => {
				console.log({ e })
			})
	}
	return (
		<div className='h-screen flex flex-col'>
			<div
				className='max-h-screen flex flex-col p-4 overflow-y-scroll'
				ref={messageListRef}
			>
				{messages.map((message) => (
					<MessageBox message={message} key={message.id} />
				))}
			</div>
			<div className='flex items-center shrink-0 mt-auto mb-2 mx-2 gap-x-2'>
				<Input
					className='w-full'
					value={input}
					onChange={(e) => {
						setInput(e.target.value)
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter') onSubmit()
					}}
				/>
				<Button onClick={onSubmit}>
					<Send size={20} />
				</Button>
			</div>
		</div>
	)
}
