# MeetMind AI

MeetMind AI is a full-stack SaaS application that helps users manage meeting records in one place. Users can securely create an account, log in, and organize their meetings through a clean dashboard.

---

## Features

### Authentication
- User Registration
- User Login
- JWT-based Authentication
- Password Hashing using bcrypt
- Protected Routes

### Meeting Management
- Create Meeting
- View All Meetings
- Edit Meeting
- Delete Meeting
- Meeting Details

### Dashboard
- Dashboard Layout
- Sidebar Navigation
- Navbar
- Dashboard Cards
- User Profile Page

### Backend
- RESTful API Architecture
- PostgreSQL Database
- Input Validation
- Centralized Error Handling
- Modular MVC Structure

### Documentation
- Project Planning
- AI Development Journal
- Progress Log

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt
- Morgan
- CORS
- dotenv

---

## Project Structure

```text
meetmind-ai/

├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── validators/
│   ├── server.js
│   └── package.json
│
├── docs/
│   ├── planning.md
│   ├── ai-journal.md
│   └── progress-log.md
│
└── README.md
```

---

## Database

The application uses PostgreSQL as its primary database.

Current schema includes:

- Users
- Meetings

Future iterations will include:

- AI Summaries
- Action Items

---

## API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Meetings

| Method | Endpoint |
|---------|----------|
| GET | /api/meetings |
| GET | /api/meetings/:id |
| POST | /api/meetings |
| PUT | /api/meetings/:id |
| DELETE | /api/meetings/:id |

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/meetmind-ai.git

cd meetmind-ai
```

---

## Backend Setup

```bash
cd server

npm install
```

Create a `.env` file inside the **server** directory.

```env
PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_secret_key
```

Run the backend server

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

The frontend will run on

```
http://localhost:5173
```

The backend will run on

```
http://localhost:5000
```

---

## Current Development Status

### Completed

- Project Planning
- Repository Setup
- React Application Setup
- Express Server Setup
- PostgreSQL Integration
- JWT Authentication
- User Registration & Login
- Meeting CRUD APIs
- Protected Routes
- Dashboard Layout
- Documentation

### In Progress

- Dashboard Data Integration
- Meeting Details UI
- Profile Improvements

### Planned

- AI Meeting Summary Generation
- AI Action Item Extraction
- AI Follow-up Email Generation
- Search & Filter
- Responsive UI Enhancements
- Deployment

---

## Documentation

Additional project documentation is available inside the **docs** directory.

- planning.md
- ai-journal.md
- progress-log.md

---

## Future Enhancements

- Google Gemini AI Integration
- AI Meeting Summaries
- AI Action Items
- AI Follow-up Emails
- Search & Filtering
- User Statistics
- Responsive Dashboard
- Deployment
- Reflection Document

---

## Development Approach

This project is being developed using an AI-assisted development workflow. Every major milestone is documented through planning documents, progress logs, and AI interaction records to demonstrate engineering decisions, iterative development, and responsible AI usage.

---

## License

This project was developed as part of the **CEDCOSS Vibe Coder Assessment** for educational and evaluation purposes.