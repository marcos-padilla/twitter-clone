# Social Network App

Welcome to the Social Network App repository! This full-stack application is built using Laravel in the backend and Next.js in the frontend. It provides a platform for users to connect, share updates, and engage with each other in a social setting.

## Features

-    **User Authentication**: Secure user authentication system to ensure a personalized experience.
-    **Profile Management**: Users can create and customize their profiles with personal information and profile pictures.
-    **Post Creation and Interaction**: Users can create posts, like, and comment on others' posts, fostering interaction within the community.
-    **Real-time Updates**: Stay updated with real-time notifications for new posts, likes, and comments.
-    **Friendship System**: Users can connect with each other by sending and accepting friend requests.
-    **Responsive Design**: A mobile-friendly design ensures a seamless experience on various devices.

## Tech Stack

-    **Backend**: Laravel, a powerful PHP framework known for its elegance and simplicity.
-    **Frontend**: Next.js, a React framework for building fast and scalable applications.
-    **Database**: Utilizing a relational database (e.g., MySQL) for efficient data storage.
-    **Real-time Communication**: Implementing websockets for real-time updates.

## Getting Started

1. **Clone the Repository:**

     ```bash
     git clone https://github.com/marcos-padilla/twitter-clone.git

     cd twitter-clone
     ```

2. **Install Dependencies:**

-    Backend (Laravel)
     ```bash
     cd backend
     composer install
     ```
-    Frontend (Next JS)
     ```bash
     cd frontend
     npm install
     ```

3. **Environment Variables:**

-    Create both backend and frontend .env files

     ```bash
     cd backend
     copy .env.example .env
     ```

     ```bash
     cd frontend
     copy .env.example .env
     ```

4. **Database Setup:**

-    Configure your database connection in **/backend/.env** file
-    Run migrations and seed the database:
     ```bash
     php artisan migrate --seed
     ```

5. **Run the Application:**

-    Backend (Laravel):
     ```bash
     php artisan serve
     ```
-    Frontend (Next JS):
     ```bash
     npm run dev
     ```

## Develoeper Instructions
- If you make any change in any endpoint, make sure tu run **sync-routes.py** script in order to keep synchronized routes between frontend and backend

 
### Access the application at: [http://localhost:3000](http://localhost:3000)
