import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
