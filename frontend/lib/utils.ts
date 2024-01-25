import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { routes } from './routes'
import { RouteName } from '@/types'

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

export function route(
	name: RouteName,
	params?: Record<string, string | number>
) {
	const route = routes[name]
	if (!route) throw new Error(`Route ${name} not found`)
	let uri = route.uri as RouteName
	if (params) {
		for (const [key, value] of Object.entries(params)) {
			uri = (uri as string).replace(
				`{${key}}`,
				value.toString()
			) as RouteName
		}
	}
	return uri
}
