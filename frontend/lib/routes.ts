export const routes = {
	signin: {
		method: 'POST',
		uri: 'api/auth/signin',
	},
	signout: {
		method: 'POST',
		uri: 'api/auth/signout',
	},
	signup: {
		method: 'POST',
		uri: 'api/auth/signup',
	},
	'blocked.index': {
		method: 'GET|HEAD',
		uri: 'api/blocked-users',
	},
	'blocked.store': {
		method: 'POST',
		uri: 'api/blocked-users/{user}',
	},
	'blocked.destroy': {
		method: 'DELETE',
		uri: 'api/blocked-users/{user}',
	},
	'poll.vote': {
		method: 'POST',
		uri: 'api/polls/{poll}/vote',
	},
	'posts.index': {
		method: 'GET|HEAD',
		uri: 'api/posts',
	},
	'posts.store': {
		method: 'POST',
		uri: 'api/posts',
	},
	'posts.like': {
		method: 'POST',
		uri: 'api/posts/posts/{post}/like',
	},
	'posts.show': {
		method: 'GET|HEAD',
		uri: 'api/posts/{post}',
	},
	'posts.update': {
		method: 'PUT|PATCH',
		uri: 'api/posts/{post}',
	},
	'posts.destroy': {
		method: 'DELETE',
		uri: 'api/posts/{post}',
	},
	'posts.comments.store': {
		method: 'POST',
		uri: 'api/posts/{post}/comments',
	},
	'posts.comments.destroy': {
		method: 'DELETE',
		uri: 'api/posts/{post}/comments/{comment}',
	},
	'roles.store': {
		method: 'POST',
		uri: 'api/roles',
	},
	'roles.update': {
		method: 'PUT|PATCH',
		uri: 'api/roles/{role}',
	},
	'roles.destroy': {
		method: 'DELETE',
		uri: 'api/roles/{role}',
	},
	'roles.assign': {
		method: 'POST',
		uri: 'api/roles/{role}/assign',
	},
	'settings.show': {
		method: 'GET|HEAD',
		uri: 'api/settings',
	},
	'settings.update': {
		method: 'PUT',
		uri: 'api/settings',
	},
	'users.update': {
		method: 'PUT',
		uri: 'api/user',
	},
	'users.update-avatar': {
		method: 'POST',
		uri: 'api/user/avatar',
	},
	'users.show-authenticated-user': {
		method: 'GET|HEAD',
		uri: 'api/user/me',
	},
	'users.show-by-username': {
		method: 'GET|HEAD',
		uri: 'api/user/{username}',
	},
	'users.follow': {
		method: 'POST',
		uri: 'api/user/{user}/follow',
	},
	'users.send-message': {
		method: 'POST',
		uri: 'api/user/{user}/message',
	},
	'users.view-message': {
		method: 'GET|HEAD',
		uri: 'api/user/{user}/message',
	},
	'users.unfollow': {
		method: 'DELETE',
		uri: 'api/user/{user}/unfollow',
	},
} as const
