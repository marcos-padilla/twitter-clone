export const routes = {
     "signin": {
          method: "POST",
          url: "api/auth/signin",
     },
     "signout": {
          method: "POST",
          url: "api/auth/signout",
     },
     "signup": {
          method: "POST",
          url: "api/auth/signup",
     },
     "blocked.index": {
          method: "GET",
          url: "api/blocked-users",
     },
     "blocked.store": {
          method: "POST",
          url: "api/blocked-users/{user}",
     },
     "blocked.destroy": {
          method: "DELETE",
          url: "api/blocked-users/{user}",
     },
     "poll.vote": {
          method: "POST",
          url: "api/polls/{poll}/vote",
     },
     "posts.index": {
          method: "GET",
          url: "api/posts",
     },
     "posts.store": {
          method: "POST",
          url: "api/posts",
     },
     "posts.like": {
          method: "POST",
          url: "api/posts/posts/{post}/like",
     },
     "posts.show": {
          method: "GET",
          url: "api/posts/{post}",
     },
     "posts.update": {
          method: "PUT",
          url: "api/posts/{post}",
     },
     "posts.destroy": {
          method: "DELETE",
          url: "api/posts/{post}",
     },
     "posts.comments.store": {
          method: "POST",
          url: "api/posts/{post}/comments",
     },
     "posts.comments.destroy": {
          method: "DELETE",
          url: "api/posts/{post}/comments/{comment}",
     },
     "roles.store": {
          method: "POST",
          url: "api/roles",
     },
     "roles.update": {
          method: "PUT",
          url: "api/roles/{role}",
     },
     "roles.destroy": {
          method: "DELETE",
          url: "api/roles/{role}",
     },
     "roles.assign": {
          method: "POST",
          url: "api/roles/{role}/assign",
     },
     "settings.show": {
          method: "GET",
          url: "api/settings",
     },
     "settings.update": {
          method: "PUT",
          url: "api/settings",
     },
     "users.update": {
          method: "PUT",
          url: "api/user",
     },
     "users.update-avatar": {
          method: "POST",
          url: "api/user/avatar",
     },
     "users.show-authenticated-user": {
          method: "GET",
          url: "api/user/me",
     },
     "users.show-by-username": {
          method: "GET",
          url: "api/user/{username}",
     },
     "users.follow": {
          method: "POST",
          url: "api/user/{user}/follow",
     },
     "users.send-message": {
          method: "POST",
          url: "api/user/{user}/message",
     },
     "users.view-message": {
          method: "GET",
          url: "api/user/{user}/message",
     },
     "users.unfollow": {
          method: "DELETE",
          url: "api/user/{user}/unfollow",
     },
} as const
