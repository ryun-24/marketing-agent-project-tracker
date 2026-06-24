-- D1 Database Schema for Marketing Agent Project Tracker

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    stage TEXT NOT NULL CHECK (stage IN ('now', 'next', 'later')),
    status TEXT NOT NULL CHECK (status IN ('on_track', 'at_risk', 'blocked', 'completed')),
    owner TEXT,
    team TEXT,
    gitlab_url TEXT,
    github_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Project updates/status history
CREATE TABLE IF NOT EXISTS project_updates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    update_type TEXT NOT NULL CHECK (update_type IN ('status_change', 'blocker', 'next_step', 'general')),
    content TEXT NOT NULL,
    created_by TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Blockers (active issues)
CREATE TABLE IF NOT EXISTS blockers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'resolved')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    resolved_at DATETIME,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO projects (name, description, stage, status, owner, team) VALUES
('AI Content Generator', 'Automated marketing copy generation using LLMs', 'now', 'on_track', 'Sarah Chen', 'Content Team'),
('Lead Scoring Model', 'ML model to prioritize sales leads', 'next', 'at_risk', 'Mike Ross', 'Data Science'),
('Chatbot Integration', 'Customer service chatbot for website', 'later', 'on_track', 'Emma Wilson', 'Engagement');

INSERT INTO project_updates (project_id, update_type, content, created_by) VALUES
(1, 'general', 'Initial prototype complete, testing with 10 users', 'Sarah Chen'),
(1, 'next_step', 'Expand to full marketing team rollout', 'Sarah Chen'),
(2, 'blocker', 'Waiting for data pipeline access from IT', 'Mike Ross'),
(3, 'general', 'Vendor evaluation in progress', 'Emma Wilson');

INSERT INTO blockers (project_id, description, severity) VALUES
(2, 'Data pipeline access pending IT approval', 'high');
