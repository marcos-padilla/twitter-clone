import { getChat } from '@/lib/actions'
import Chat from '@/components/Chat'
export default async function ChatPage({
	params: { username },
}: {
	params: { username: string }
}) {
	const messages = await getChat(username)
	console.log({ messages })

	return (
		<div>
			<Chat username={username} initialMessages={messages} />
		</div>
	)
}
