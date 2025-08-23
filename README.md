# 🎉 Event-Sphere

Event-Sphere is a simple event management web app built with **Next.js** and **Supabase**.  
It allows users to **register, create events, RSVP to events, and manage their responses**.  

I built this project as part of a **Database Management Assessment** for the PixaBeam hiring process.

---

## 🚀 Features

- **User Registration** – Create and manage new users.  
- **Event Creation** – Add new events with title, description, date, and city.  
- **RSVP Management** – Respond to events with **Yes / No / Maybe**.  
- **Dynamic Tables**:
  - **Home Page** → Displays all events in a table.  
  - **My Events Page** → Shows:
    - Events I created  
    - Events I RSVP’d to (with ability to change RSVP status)  
- **About & Contact Pages** – General app information.

---

## 🗄️ Database Design (Supabase)

I designed the database with three main tables:

1. **Users**  
   - `id` (PK)  
   - `name`  
   - `email`  
   - `created_at`  

2. **Events**  
   - `id` (PK)  
   - `title`  
   - `description`  
   - `date`  
   - `city`  
   - `created_by` (FK → Users.id)  

3. **RSVPs**  
   - `id` (PK)  
   - `user_id` (FK → Users.id)  
   - `event_id` (FK → Events.id)  
   - `status` (Yes / No / Maybe)  

✔ Referential integrity is enforced (e.g., deleting a user also deletes their RSVPs).  
✔ Added sample data (10 Users, 5 Events, 20 RSVPs).  

---

## 📦 Deliverables

- ✅ **Schema Export** – Supabase SQL dump  
- ✅ **Database Screenshots** – Tables & Data  
- ✅ **ER Diagram** – Visual database structure  
- ✅ **App Demo** – Connected with Supabase  

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS  
- **Backend**: Supabase (PostgreSQL)  
- **Hosting**: Vercel  

---
