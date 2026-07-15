-- ==========================================
-- MeetMind AI Database Schema
-- ==========================================

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Meetings Table
CREATE TABLE meetings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    meeting_type VARCHAR(100) NOT NULL,
    participants TEXT,
    meeting_notes TEXT NOT NULL,
    meetingDate DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- AI Summaries Table
CREATE TABLE ai_summaries (
    id SERIAL PRIMARY KEY,
    meeting_id INTEGER NOT NULL,
    summary TEXT NOT NULL,
    key_points TEXT,
    followup_email TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_meeting_summary
        FOREIGN KEY (meeting_id)
        REFERENCES meetings(id)
        ON DELETE CASCADE
);

-- Action Items Table
CREATE TABLE action_items (
    id SERIAL PRIMARY KEY,
    meeting_id INTEGER NOT NULL,
    task TEXT NOT NULL,
    assigned_to VARCHAR(100),
    deadline DATE,
    completed BOOLEAN DEFAULT FALSE,

    CONSTRAINT fk_meeting_action
        FOREIGN KEY (meeting_id)
        REFERENCES meetings(id)
        ON DELETE CASCADE
);