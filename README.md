# Campus Marketplace & Lost-Found Platform

A full-stack MERN web application where college students can buy, sell, save, search, and report campus items. The platform also includes a Lost & Found section and an admin dashboard for managing users, posts, and reports.

## Live Demo

[View Live Project](https://campus-marketplace-frontend-eta.vercel.app/)

## Project Overview

Campus Marketplace & Lost-Found Platform is designed for college students to easily trade useful items such as books, electronics, cycles, hostel items, and also report lost or found belongings like ID cards, keys, calculators, and more.

The project includes authentication, role-based authorization, protected routes, post management, saved posts, report moderation, and admin control features.

## Features

### User Features

- College ID based signup and login
- JWT-based authentication
- Protected routes for logged-in users
- Create marketplace or lost/found posts
- View all posts
- Search posts by title or description
- Filter posts by category and type
- View full post details
- Edit and delete only own posts
- Save posts for later
- View saved posts
- Unsave posts
- Report inappropriate or fake posts
- Responsive user interface

### Admin Features

- Admin dashboard
- View all users
- Block and unblock users
- View all posts
- Delete any inappropriate post
- View all reports
- View reported post details
- Delete reported posts
- Update report status as Pending, Resolved, or Rejected

## Tech Stack

### Frontend

- React
- React Router DOM
- Axios
- CSS
- Vite
- Vercel

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS
- Render

### Database

- MongoDB Atlas

## Main Functionalities

- Authentication and authorization
- User and admin roles
- CRUD operations for posts
- Search and filtering
- Saved posts system
- Report and moderation system
- Admin user management
- Admin post management
- MongoDB relationships using ObjectId references

## Folder Structure

```bash
CampusMarketplace/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
└── backend/
    ├── config/
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── utils/
    ├── server.js
    └── package.json
```

## Environment Variables

### Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend `.env`

```env
VITE_BACKEND_URL=your_backend_url/api
```

Example:

```env
VITE_BACKEND_URL=https://your-backend.onrender.com/api
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ParthDev999/CampusMarketplace.git
```

### 2. Setup Backend

```bash
cd backend
npm install
npm run dev
```

Backend will run on:

```bash
http://localhost:5000
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

## API Routes Overview

### Auth Routes

```bash
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
```

### Post Routes

```bash
POST   /api/posts
GET    /api/posts
GET    /api/posts/:id
GET    /api/posts/my-posts
PUT    /api/posts/:id
DELETE /api/posts/:id
```

### Saved Post Routes

```bash
POST   /api/saved/:postId
GET    /api/saved
DELETE /api/saved/:postId
```

### Report Routes

```bash
POST /api/reports/:postId
```

### Admin Routes

```bash
GET    /api/admin/users
PATCH  /api/admin/users/:id/block
PATCH  /api/admin/users/:id/unblock

GET    /api/admin/posts
DELETE /api/admin/posts/:id

GET    /api/admin/reports
PATCH  /api/admin/reports/:id/status
```

## Deployment

### Frontend

The frontend is deployed on Vercel.

Live link:

```bash
https://campus-marketplace-frontend-eta.vercel.app/
```

### Backend

The backend is deployed on Render.

### Database

MongoDB Atlas is used for cloud database storage.

## Important Implementation Details

- JWT token is stored in localStorage after login.
- Protected routes are used for authenticated users.
- Admin routes are protected separately using role-based authorization.
- Passwords are securely hashed using bcrypt.
- MongoDB ObjectId references are used to connect users, posts, saved posts, and reports.
- React Router is configured with `vercel.json` to prevent 404 errors on page refresh.

## What I Learned

- Building a complete MERN stack application
- Creating REST APIs using Express.js
- Connecting backend with MongoDB Atlas
- Implementing JWT authentication
- Implementing role-based authorization
- Managing protected frontend routes
- Handling CRUD operations
- Creating admin dashboard functionality
- Deploying backend on Render
- Deploying frontend on Vercel
- Using environment variables in production

## Future Improvements

- Add real image upload using Cloudinary
- Add chat between buyer and seller
- Add email verification
- Add forgot password functionality
- Add post expiry for old listings
- Add advanced admin analytics
- Add pagination for posts
- Add notification system

## Author

**Parth Sawaria**

GitHub: [ParthDev999](https://github.com/ParthDev999)
