# MeetMind AI

MeetMind AI is a full-stack AI-powered SaaS application that helps users organize meeting notes, generate AI-powered insights, and manage meeting workflows efficiently.

Built as part of the **CEDCOSS Vibe Coder Assessment**, the project demonstrates AI-assisted software development, modular architecture, clean engineering practices, and complete documentation of the development process.

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected Backend APIs
- Protected Frontend Routes
- Persistent User Sessions

---

## Meeting Management

- Create Meeting
- View All Meetings
- View Meeting Details
- Edit Meeting
- Delete Meeting
- Ownership-based Authorization
- Meeting History

---

## AI-Powered Features

Powered by **Google Gemini AI**

- Generate Meeting Summary
- Generate Action Items
- Generate Professional Follow-up Email
- AI-powered Meeting Details page
- Secure AI API endpoints

---

## Dashboard

- Live Dashboard Statistics
- Total Meetings
- AI Summaries
- Pending Tasks
- Meetings This Month
- Latest Five Meetings
- Sidebar Navigation
- Responsive Dashboard Layout

---

## Profile Management

- View Profile
- Update Name
- Update Email
- Change Password
- JWT-Protected Profile APIs

---

## Backend

- RESTful API Architecture
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt Password Hashing
- Modular MVC Architecture
- Centralized Error Handling
- Input Validation

---

## Documentation

The project includes complete engineering documentation:

- Project Planning
- AI Development Journal
- Development Progress Log
- README

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Context API

---

## Backend

- Node.js
- Express.js
- PostgreSQL
- Google Gemini AI
- JWT
- bcrypt
- Morgan
- dotenv
- CORS

---

# Project Structure

```text
meetmind-ai/

├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
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
│   ├── services/
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

# Database Schema

## Users

- id
- name
- email
- password
- created_at

---

## Meetings

- id
- user_id
- title
- meeting_type
- participants
- meeting_notes
- meeting_date
- created_at

---

## AI Summaries

- id
- meeting_id
- summary
- key_points
- followup_email
- created_at

---

## Action Items

- id
- meeting_id
- task
- assigned_to
- deadline
- completed

---

# API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

---

## Meetings

| Method | Endpoint |
|---------|----------|
| GET | /api/meetings |
| GET | /api/meetings/:id |
| POST | /api/meetings |
| PUT | /api/meetings/:id |
| DELETE | /api/meetings/:id |

---

## AI

| Method | Endpoint |
|---------|----------|
| POST | /api/ai/summary |
| POST | /api/ai/action-items |
| POST | /api/ai/followup |

---

## Dashboard

| Method | Endpoint |
|---------|----------|
| GET | /api/dashboard/stats |

---

## Profile

| Method | Endpoint |
|---------|----------|
| GET | /api/profile |
| PUT | /api/profile |
| PUT | /api/profile/password |

---

# Installation

## Clone Repository

```bash
git clone https://github.com/harshitsingh3604/meetmind-ai.git

cd meetmind-ai
```

---

## Backend Setup

```bash
cd server

npm install
```

Create a `.env` file:

```env
PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

Run backend

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

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

# Application Workflow

```text
User Login
      │
      ▼
Dashboard
      │
      ▼
Create Meeting
      │
      ▼
Meeting History
      │
      ▼
Meeting Details
      │
      ▼
Generate AI Insights
      │
      ▼
Gemini AI
      │
      ▼
Summary • Action Items • Follow-up Email
```

---

# Current Project Status

## Completed

- Project Planning
- React + Vite Setup
- Express Backend
- PostgreSQL Integration
- JWT Authentication
- User Registration & Login
- Protected Routes
- Meeting CRUD APIs
- Meeting History
- Meeting Details
- Meeting Editing
- Dashboard Integration
- Live Dashboard Statistics
- Profile Management
- Google Gemini AI Integration
- AI Summary Generation
- AI Action Item Generation
- AI Follow-up Email Generation
- AI-powered Meeting Details
- Development Documentation

---

## Remaining Improvements

- Frontend validation enhancements
- save the Gemini generated data into dashboard 
- Avatar placeholder
- UI polish

---

# Documentation

Complete project documentation is available in the `docs` folder.

- `planning.md`
- `progress-log.md`
- `ai-journal.md`

These documents describe:

- Project planning
- Architecture decisions
- Development milestones
- AI-assisted workflow
- Engineering decisions
- Challenges encountered
- Manual implementation details

---

# AI-Assisted Development

This project was intentionally developed using an AI-assisted workflow.

AI was used for:

- System architecture
- Database design
- API planning
- Prompt engineering
- Documentation
- Debugging
- Development guidance

All generated suggestions were manually reviewed, adapted, implemented, tested, and validated before being included in the project.

---

# License

This project was developed as part of the **CEDCOSS Technologies Vibe Coder Assessment** for educational and evaluation purposes.