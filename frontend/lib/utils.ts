import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { routes } from './routes'
import { HttpMethod, RouteName } from '@/types'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getAvatarFallback(name: string | null | undefined) {
	if (!name) return 'X'
	return name
		?.split(' ')
		.slice(0, 2)
		.map((n) => n[0])
		.join('')
}

export function route({
	name,
	params,
	searchQuery,
}: {
	name: RouteName
	params?: Record<string, any>
	searchQuery?: Record<string, string>
}) {
	const route = routes[name]
	if (!route) throw new Error(`Route ${name} not found`)
	let url = route.url as RouteName
	if (params) {
		for (const [key, value] of Object.entries(params)) {
			if (value === null) {
				url = (url as string).replace(`{${key}}`, '') as RouteName
			} else {
				url = (url as string).replace(
					`{${key}}`,
					value.toString()
				) as RouteName
			}
		}
	}
	if (searchQuery) {
		url = url + '?' + new URLSearchParams(searchQuery).toString()
	}
	return {
		method: route.method as HttpMethod,
		url,
	}
}
