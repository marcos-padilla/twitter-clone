'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import axios from 'axios'

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
		url: `http://127.0.0.1:8000/api${url}`,
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
