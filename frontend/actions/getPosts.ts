import { sendRequest } from './serverRequest'

export const getPosts = async () => {
	const res = await sendRequest('GET', '/posts')
	return res.data
}
