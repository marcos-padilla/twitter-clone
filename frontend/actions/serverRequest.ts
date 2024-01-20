import axios from 'axios'
import { serverSession } from './getServerSession'

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
