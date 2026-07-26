# MeetMind AI - Project Planning

## Project Information

| Property | Value |
|----------|-------|
| **Project Name** | MeetMind AI |
| **Project Type** | Full-Stack SaaS Web Application |
| **Version** | 1.0.0 |
| **Status** | Active Development |
| **Author** | Harshit Singh |

---

# Project Overview

MeetMind AI is a full-stack Software-as-a-Service (SaaS) application designed to simplify meeting management through artificial intelligence. The platform enables users to securely create, organize, and manage meeting records while leveraging AI to automatically generate meeting summaries, extract key discussion points, identify actionable tasks, and draft professional follow-up emails.

The application demonstrates modern full-stack development practices including secure authentication, RESTful API design, AI integration, responsive user interfaces, and cloud deployment.

---

# Problem Statement

Meetings often produce valuable information such as decisions, action items, deadlines, and follow-up discussions. Managing this information manually is time-consuming, inconsistent, and difficult to track over time.

MeetMind AI addresses these challenges by providing a centralized platform where users can store meeting notes and use AI-powered tools to automatically process and organize meeting content into structured, actionable information.

---

# Project Objectives

The primary objectives of the project are:

- Build a scalable full-stack SaaS application.
- Implement secure user authentication and authorization.
- Provide complete CRUD functionality for meeting management.
- Integrate Generative AI to improve productivity.
- Maintain clean software architecture and modular code.
- Ensure responsive user experience across devices.
- Follow industry-standard development and deployment practices.
- Create maintainable documentation for future development.

---

# Target Users

The platform is designed for:

- Students
- Software Developers
- Project Managers
- Team Leads
- Freelancers
- Startup Teams
- Business Professionals

---

# Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt
- REST API Architecture

---

## Database

- PostgreSQL

---

## AI Integration

- Google Gemini API

---

## Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon PostgreSQL |

---

# Functional Requirements

## User Authentication

The application provides secure authentication using JSON Web Tokens (JWT).

Features include:

- User Registration
- User Login
- Password Encryption
- Protected API Routes
- User Logout
- Session Validation

---

## Dashboard

The dashboard serves as the application's primary workspace.

Features include:

- Total Meetings
- AI Summaries Generated
- Pending Action Items
- Recent Meetings
- Quick Navigation

---

## Meeting Management

Users can efficiently manage meeting records through complete CRUD operations.

Features include:

- Create Meeting
- View Meeting
- Edit Meeting
- Delete Meeting
- Meeting Details

---

## AI Features

AI enhances meeting productivity by automatically generating useful content.

Current capabilities include:

- Meeting Summary Generation
- Key Discussion Points
- Action Item Extraction
- Follow-up Email Generation

Future AI capabilities may include:

- Meeting Categorization
- Smart Recommendations
- AI Chat Assistant
- Meeting Templates

---

## Search and Filtering

Users can efficiently locate meetings using search and filtering capabilities.

Current features:

- Search by Meeting Title
- Search by Participants
- Filter by Meeting Type
- Filter by Meeting Date

Future enhancements may include:

- Full-text Search
- Advanced Filters
- Sorting Options
- Saved Filters

---

# Non-Functional Requirements

The application is designed with the following quality attributes:

- Secure Authentication
- Responsive Design
- Modular Architecture
- RESTful API Design
- Scalable Database Structure
- Maintainable Codebase
- Cloud Deployment
- Easy Feature Extension

---

# Application Workflow

```
User Registration
        │
        ▼
User Login
        │
        ▼
Dashboard
        │
        ▼
Create or Manage Meetings
        │
        ▼
Store Meeting Notes
        │
        ▼
Generate AI Insights
        │
        ▼
View & Manage Meeting History
        │
        ▼
Profile Management
        │
        ▼
Logout
```

---

# System Architecture

```
                React Frontend
                      │
                Axios HTTP Client
                      │
             Express REST API
                      │
        Authentication Middleware
                      │
         Business Logic Layer
              │             │
              │             │
      PostgreSQL Database   Google Gemini API
              │
        Persistent Storage
```

---

# Database Design

## Users

| Field | Description |
|--------|-------------|
| id | Primary Key |
| name | User Name |
| email | Unique Email |
| password | Encrypted Password |
| created_at | Creation Timestamp |

---

## Meetings

| Field | Description |
|--------|-------------|
| id | Primary Key |
| user_id | Owner Reference |
| title | Meeting Title |
| meeting_type | Meeting Category |
| participants | Participants |
| meeting_notes | Raw Notes |
| meeting_date | Meeting Date |
| created_at | Creation Timestamp |

---

## AI Summaries

| Field | Description |
|--------|-------------|
| id | Primary Key |
| meeting_id | Meeting Reference |
| summary | AI Summary |
| key_points | Key Discussion Points |
| followup_email | Generated Email |
| created_at | Creation Timestamp |

---

## Action Items

| Field | Description |
|--------|-------------|
| id | Primary Key |
| meeting_id | Meeting Reference |
| task | Action Item |
| assigned_to | Responsible Person |
| deadline | Due Date |
| completed | Completion Status |

---

# API Overview

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

---

## Meetings

```
GET    /api/meetings
GET    /api/meetings/:id
POST   /api/meetings
PUT    /api/meetings/:id
DELETE /api/meetings/:id
```

---

## AI Services

```
POST /api/ai/summary/:meetingId
POST /api/ai/key-points/:meetingId
POST /api/ai/action-items/:meetingId
POST /api/ai/followup-email/:meetingId
```

---

## Profile

```
GET /api/profile
PUT /api/profile
PUT /api/profile/password
```

---

# Project Structure

```
meetmind-ai/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── config/
│   └── package.json
│
├── docs/
│
├── README.md
│
└── .gitignore
```

---

# Future Roadmap

The project is designed to support future enhancements without requiring major architectural changes.

Planned improvements include:

- Meeting Attachments
- Rich Text Meeting Notes
- AI Chat Assistant
- Meeting Templates
- Calendar Integration
- Email Notifications
- Export Meeting as PDF
- Export Meeting as DOCX
- Team Collaboration
- Shared Workspaces
- Role-Based Access Control (RBAC)
- Dark Mode
- Activity Logs
- Analytics Dashboard
- Real-Time Collaboration
- WebSocket Notifications
- Docker Deployment
- CI/CD Pipeline
- Automated Testing
- Multi-language Support

---

# Design Principles

The application follows the following software engineering principles:

- Separation of Concerns
- Modular Architecture
- Reusable Components
- RESTful API Design
- Secure Authentication
- Scalable Database Design
- Maintainable Codebase
- Cloud-Native Deployment
- Future Extensibility

---

# Document Maintenance

This document serves as the project's planning and architectural reference.

As the application evolves, this document should be updated to reflect:

- Newly implemented features
- Architectural improvements
- Technology changes
- API additions
- Database modifications
- Deployment updates
- Future roadmap revisions

Maintaining this document ensures the project remains well-documented, scalable, and easy to extend.
