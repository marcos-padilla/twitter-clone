import { sidebarItems } from './lib/constants'

export type SidebarItem = (typeof sidebarItems)[number]
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type PollInput = {
	questions: {
		question: string
	}[]
	pollLength: {
		days: number
		hours: number
		minutes: number
	}
}

// Response Types

export type User = {
	id: number
	name: string
	email: string
	username: string
	email_verified_at: string | null
	avatar_path: string | null
	created_at: string
	updated_at: string
}

export type Media = {}

export type Question = {
	id: number
	poll_id: number
	question: string
	created_at: string
	updated_at: string
}

export type Poll = {
	id: number
	post_id: number
	questions: Question[]
	created_at: string
	updated_at: string
}

export type Post = {
	id: number
	content: string
	user_id: number
	reply: string
	scheduled_at: string | null
	is_pinned: boolean
	is_sensitive: boolean
	created_at: string
	updated_at: string
	media: Media[]
	count_comment: number
	count_like: number
	count_repost: number
	is_liked: boolean
	poll: Poll | null
}

export type PostWithUser = Post & {
	user: User
}
