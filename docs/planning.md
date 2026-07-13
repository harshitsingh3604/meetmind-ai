# MeetMind AI - Project Planning

## Project Information

**Project Name:** MeetMind AI

**Project Type:** Mini SaaS Application

**Technology Stack**

Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt

Database
- PostgreSQL

AI Integration
- Google Gemini API

Deployment (Planned)
- Frontend: Vercel
- Backend: Render
- Database: Neon PostgreSQL

---

# Problem Statement

Meeting discussions often contain valuable information such as decisions, action items, and follow-up tasks. However, manually organizing meeting notes is time-consuming and prone to errors.

MeetMind AI solves this problem by allowing users to store meeting notes and leverage AI to automatically generate concise summaries, extract key discussion points, identify action items, and create professional follow-up emails.

---

# Application Overview

MeetMind AI is a full-stack SaaS application that enables authenticated users to manage meeting records in one place. Users can create, edit, search, and organize meetings while utilizing AI-powered features to improve productivity.

The application focuses on providing a clean user experience, secure authentication, structured data management, and practical AI assistance.

---

# Objectives

- Build a complete CRUD application
- Demonstrate secure authentication
- Integrate AI for real-world productivity
- Follow clean software architecture
- Maintain proper Git workflow
- Document AI-assisted development process

---

# Core Features

## Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Logout

---

## Dashboard

- Total Meetings
- Recent Meetings
- AI Summaries Generated
- Pending Action Items

---

## Meeting Management

- Create Meeting
- Edit Meeting
- Delete Meeting
- View Meeting
- Meeting History

---

## AI Features

- AI Meeting Summary
- Key Discussion Points
- Action Item Extraction
- Follow-up Email Generation

---

## Search & Filter

- Search by title
- Search by participant
- Filter by meeting type
- Filter by date

---

# User Flow

User Registration

↓

Login

↓

Dashboard

↓

Create Meeting

↓

Save Meeting Notes

↓

Generate AI Summary

↓

Review AI Output

↓

Manage Meeting History

↓

Logout

---

# Technical Architecture

Frontend (React)

↓

REST API (Express)

↓

Business Logic

↓

PostgreSQL Database

↓

Gemini API (AI Processing)

---

# Database Design

## users

- id
- name
- email
- password
- created_at

---

## meetings

- id
- user_id
- title
- meeting_type
- participants
- meeting_notes
- meeting_date
- created_at

---

## ai_summaries

- id
- meeting_id
- summary
- key_points
- followup_email
- created_at

---

## action_items

- id
- meeting_id
- task
- assigned_to
- deadline
- completed

---

# API Overview

Authentication

POST /api/auth/register

POST /api/auth/login

---

Meetings

GET /api/meetings

GET /api/meetings/:id

POST /api/meetings

PUT /api/meetings/:id

DELETE /api/meetings/:id

---

AI

POST /api/ai/summary/:meetingId

POST /api/ai/action-items/:meetingId

POST /api/ai/followup-email/:meetingId

---

# Folder Structure

meetmind-ai/

client/

server/

docs/

README.md

---

# Development Milestones

## Day 1

- Repository Setup
- Documentation
- React Setup
- Express Setup
- PostgreSQL Configuration
- Authentication
- Meeting CRUD

---

## Day 2

- Gemini Integration
- Dashboard Polish
- Search & Filters
- Error Handling
- Testing
- Deployment
- README
- Reflection
- Loom Video

---

# Success Criteria

- Fully functional application
- Secure authentication
- AI integration
- Responsive UI
- Clean architecture
- Proper documentation
- Meaningful Git history