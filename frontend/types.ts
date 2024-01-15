import { sidebarItems } from './lib/constants'

export type SidebarItem = (typeof sidebarItems)[number]

export type PollInput = {
	questions: string[]
	pollLength: {
		days: number
		hours: number
		minutes: number
	}
}
