'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import axios from 'axios'
import { revalidatePath } from 'next/cache'
import { PollInput } from '@/types'

export const serverSession = async () => {
	return await getServerSession(authOptions)
}

export const sendRequest = async (
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	url: string,
	body?: any,
	headers?: any
) => {
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

export const getPosts = async (page: number = 1) => {
	const res = await sendRequest('GET', `/posts?page=${page}`)
	return res.data
}

export const post = async (content: string, poll: PollInput | null) => {
	try {
		const res = await sendRequest('POST', '/posts', {
			content,
			poll,
		})
		return res
	} catch (e) {
		return e
	}
}

export const postComment = async (formData: FormData) => {
	try {
		const postId = formData.get('post_id')
		const comment = formData.get('comment')
		const res = await sendRequest('POST', `/posts/${postId}/comments`, {
			comment,
		})
		return res.data
	} catch (e) {
		revalidatePath('/')
	}
}

export const likePost = async (formData: FormData) => {
	try {
		const postId = formData.get('post_id')
		const res = await sendRequest('POST', `/posts/${postId}/like`)
		return res.data
	} catch (e) {
		console.log(e)

		revalidatePath('/')
	}
}

export const vote = async (pollId: number, questionId: number) => {
	const res = await sendRequest('POST', `/polls/${pollId}/vote`, {
		question_id: questionId,
	})
	return res.data
}
