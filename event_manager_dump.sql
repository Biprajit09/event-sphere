-- SQL Dump File for Users, Events, and RSVPs 

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS rsvps;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

-- Create Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at DATE NOT NULL
);

-- Create Events Table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    city TEXT NOT NULL,
    created_by UUID NOT NULL,
    CONSTRAINT fk_event_user FOREIGN KEY (created_by) REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Create RSVPs Table
CREATE TABLE rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    status TEXT CHECK (status IN ('Yes','No','Maybe')),
    CONSTRAINT fk_rsvp_user FOREIGN KEY (user_id) REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_rsvp_event FOREIGN KEY (event_id) REFERENCES events (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Insert Sample Data: Users
INSERT INTO users (id, name, email, created_at) VALUES
('11111111-1111-1111-1111-111111111111', 'Amit Sharma', 'amit.sharma@example.com', '2025-01-10'),
('22222222-2222-2222-2222-222222222222', 'Priya Singh', 'priya.singh@example.com', '2025-01-12'),
('33333333-3333-3333-3333-333333333333', 'Rahul Mehta', 'rahul.mehta@example.com', '2025-01-15'),
('44444444-4444-4444-4444-444444444444', 'Sneha Patel', 'sneha.patel@example.com', '2025-01-18'),
('55555555-5555-5555-5555-555555555555', 'Vikram Rao', 'vikram.rao@example.com', '2025-01-20'),
('66666666-6666-6666-6666-666666666666', 'Neha Kapoor', 'neha.kapoor@example.com', '2025-01-25'),
('77777777-7777-7777-7777-777777777777', 'Arjun Nair', 'arjun.nair@example.com', '2025-01-28'),
('88888888-8888-8888-8888-888888888888', 'Meera Iyer', 'meera.iyer@example.com', '2025-02-01'),
('99999999-9999-9999-9999-999999999999', 'Karan Gupta', 'karan.gupta@example.com', '2025-02-05'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Ananya Reddy', 'ananya.reddy@example.com', '2025-02-08');

-- Insert Sample Data: Events
INSERT INTO events (id, title, description, date, city, created_by) VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Ganesh Festival', 'Cultural celebration in Pune', '2025-08-16', 'Pune', '11111111-1111-1111-1111-111111111111'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Cricket Match', 'Local tournament finals', '2025-09-01', 'Mumbai', '22222222-2222-2222-2222-222222222222'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Tech Conference', 'Annual startup and tech event', '2025-09-10', 'Bangalore', '33333333-3333-3333-3333-333333333333'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Food Carnival', 'Street food and cultural event', '2025-10-05', 'Delhi', '44444444-4444-4444-4444-444444444444'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Music Concert', 'Live Bollywood concert', '2025-11-15', 'Hyderabad', '55555555-5555-5555-5555-555555555555');

-- Insert Sample Data: RSVPs
INSERT INTO rsvps (id, user_id, event_id, status) VALUES
('aaaa1111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Yes'),
('aaaa2222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Maybe'),
('aaaa3333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Yes'),
('aaaa4444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'No'),
('aaaa5555-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Yes'),
('aaaa6666-6666-6666-6666-666666666666', '66666666-6666-6666-6666-666666666666', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Maybe'),
('aaaa7777-7777-7777-7777-777777777777', '77777777-7777-7777-7777-777777777777', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Yes'),
('aaaa8888-8888-8888-8888-888888888888', '88888888-8888-8888-8888-888888888888', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'No'),
('aaaa9999-9999-9999-9999-999999999999', '99999999-9999-9999-9999-999999999999', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'Yes'),
('aaaabbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'Maybe');