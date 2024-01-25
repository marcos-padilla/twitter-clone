'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { HttpMethod } from '@/types'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { route } from './utils'

export const serverSession = async () => {
	return await getServerSession(authOptions)
}

export const sendRequest = async ({
	method,
	url,
	body,
	headers,
}: {
	method: HttpMethod
	url: string
	body?: any
	headers?: any
}) => {
	const session = await serverSession()
	//@ts-ignore
	const token = session?.apiToken

	const res = await axios.request({
		url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
		method,
		data: body,
		headers: {
			Authorization: `Bearer ${token}`,
			...headers,
		},
	})

	return res
}

export const getPosts = async (page: string = '1') => {
	const res = await sendRequest(
		route({
			name: 'posts.index',
			searchQuery: {
				page,
			},
		})
	)
	return res.data
}

export const postComment = async (formData: FormData) => {
	try {
		const postId = formData.get('post_id')
		const comment = formData.get('comment')
		const res = await sendRequest({
			...route({
				name: 'posts.comments.store',
				params: {
					post: postId,
				},
			}),
			body: { comment },
		})
		return res.data
	} catch (e) {
		revalidatePath('/')
	}
}

export const likePost = async (formData: FormData) => {
	try {
		const postId = formData.get('post_id')
		const res = await sendRequest(
			route({
				name: 'posts.like',
				params: {
					post: postId,
				},
			})
		)
		return res.data
	} catch (e) {
		console.log(e)

		revalidatePath('/')
	}
}

export const vote = async (pollId: number, questionId: number) => {
	const res = await sendRequest({
		...route({
			name: 'poll.vote',
			params: {
				poll: pollId,
			},
		}),
		body: {
			question_id: questionId,
		},
	})
	return res.data
}

export const followUser = async (userId: number) => {
	const res = await sendRequest(
		route({
			name: 'users.follow',
			params: {
				user: userId,
			},
		})
	)
	return res.data
}

export const unfollowUser = async (userId: number) => {
	const res = await sendRequest(
		route({
			name: 'users.unfollow',
			params: {
				user: userId,
			},
		})
	)
	return res.data
}

export const getUser = async (username: string) => {
	const res = await sendRequest({
		...route({
			name: 'users.show-by-username',
			params: {
				username,
			},
		}),
	})
	return res.data
}
