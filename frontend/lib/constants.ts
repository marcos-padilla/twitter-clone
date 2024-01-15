import {
	Bell,
	Home,
	LayoutList,
	MessageCircle,
	Search,
	User,
	Users,
	X,
} from 'lucide-react'

export const sidebarItems = [
	{
		path: '/',
		Icon: X,
	},
	{
		name: 'Home',
		path: '/',
		Icon: Home,
	},
	{
		name: 'Explore',
		path: '/explore',
		Icon: Search,
	},
	{
		name: 'Notifications',
		path: '/notifications',
		Icon: Bell,
	},
	{
		name: 'Messages',
		path: '/messages',
		Icon: MessageCircle,
	},
	{
		name: 'Lists',
		path: '/lists',
		Icon: LayoutList,
	},
	{
		name: 'Communities',
		path: '/communities',
		Icon: Users,
	},
	{
		name: 'Profile',
		path: '/profile',
		Icon: User,
	},
]
