# StudyMate AI 🎓🤖

A full-stack AI learning platform designed to help students learn smarter through personalized AI-generated lessons.

StudyMate AI allows students to select a learning category and subcategory, interact with an AI tutor, track learning history, and provides administrators with full management capabilities.

---

## Features

### Student Features
- User registration and login
- JWT authentication
- Personalized dashboard
- Category selection
- Subcategory learning flow
- AI-powered lesson chat
- Beautiful markdown-rendered AI responses
- Learning history tracking
- Responsive modern UI

### Admin Features
- Admin dashboard
- View all users
- View specific user learning history
- Add categories
- Edit categories
- Delete categories
- Add subcategories
- Edit subcategories
- Delete subcategories

### Security
- Protected frontend routes
- Protected backend routes
- Role-based authorization
- JWT authentication
- Frontend and backend phone validation

### Technical Features
- OpenAI integration
- Prompt engineering for topic-focused educational tutoring
- React Markdown rendering
- Swagger API documentation
- Full CRUD admin management

---

## Tech Stack

### Frontend
- React
- Vite
- React Router DOM
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
- Swagger / OpenAPI

---

## Screenshots

### Login Page
![Login](portfolio-screenshots/localhost_5173__1.png)

### Categories Dashboard
![Categories](portfolio-screenshots/localhost_5173__2.png)

### AI Learning Chat
![Chat](portfolio-screenshots/localhost_5173__3.png)

### Admin Dashboard
![Admin Dashboard](portfolio-screenshots/localhost_5173__5.png)

### Users Management
![Users](portfolio-screenshots/localhost_5173__6.png)

### User History
![User History](portfolio-screenshots/localhost_5173__7.png)



---

## Project Structure

```text
ai-learning-platform/
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── app.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│
├── portfolio-screenshots/
└── README.md
```

---

## Installation

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

---

## Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

---

## API Documentation

Swagger docs available at:

```text
http://localhost:5000/api-docs
```

---

## AI Behavior

StudyMate AI acts as a focused educational tutor.

The AI:
- teaches according to the selected category
- stays within the chosen learning topic
- avoids irrelevant answers
- provides structured readable educational responses

---

## Author

**Shani Rabinsky**
Software Engineering Student
AI / Full Stack Developer
