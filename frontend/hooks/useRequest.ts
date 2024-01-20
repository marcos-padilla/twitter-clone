import { useToast } from '@/components/ui/use-toast'
import { HttpMethod } from '@/types'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'

export const useRequest = () => {
	const session = useSession()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<any>(null)
	const [data, setData] = useState<any>(null)
	const [apiToken, setApiToken] = useState<string | null>(null)

	useEffect(() => {
		//@ts-ignore
		if (session?.data?.apiToken) {
			//@ts-ignore
			setApiToken(session.data.apiToken)
		}
	}, [session])

	const { toast } = useToast()

	const send = async ({
		method,
		url,
		body,
		headers = {},
		showToast = true,
	}: {
		method: HttpMethod
		url: string
		body?: any
		headers?: any
		showToast?: boolean
	}) => {
		setLoading(true)
		try {
			const res = await axios.request({
				url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
				method,
				data: body,
				headers: {
					Authorization: `Bearer ${apiToken}`,
					...headers,
				},
			})

			setData(res.data)
			setLoading(false)
			return res.data
		} catch (e: any) {
			setError(e)
			setLoading(false)
			if (showToast) {
				toast({
					title: 'Error',
					description: e.response.data.message,
				})
			}
		}
	}
	return { loading, error, data, send }
}
