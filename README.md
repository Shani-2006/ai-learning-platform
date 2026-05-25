# StudyMate AI

A full-stack AI learning platform that helps students learn through personalized AI-generated lessons.

## Features

- User registration and login
- JWT authentication
- Role-based authorization
- Student dashboard
- Category and subcategory learning flow
- AI-powered lesson generation
- Learning history tracking
- Admin dashboard
- User management
- View user learning history
- Add categories
- Delete categories
- Add subcategories
- Delete subcategories
- Protected backend routes
- Swagger API documentation

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- React Markdown
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- OpenAI API
- Swagger

## How to Run

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

## Main Features

### Student
- Register
- Login
- Choose category
- Choose subcategory
- Learn with AI chat
- View learning history

### Admin
- View users
- View user learning history
- Add categories
- Delete categories
- Add subcategories
- Delete subcategories

## AI Behavior

StudyMate AI acts as an educational tutor and answers only according to the selected learning topic.

## Author

Shani Rabinsky
    │   └── App.jsx
