"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// ✅ Hero Section Component
function HeroSection() {
  return (
    <section className="bg-white py-20 border-b">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          One Stop{" "}
          <span className="text-orange-600">Event Planner</span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Create, manage, and celebrate your events effortlessly.  
          Plan smarter with{" "}
          <span className="text-orange-600 font-semibold">EventSphere</span>.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/events"
            className="px-6 py-3 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-700 transition font-medium"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 border-2 border-orange-600 text-orange-600 rounded-full shadow-md hover:bg-orange-600 hover:text-white transition font-medium"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

// ✅ Event Dashboard Component
function EventDashboard({ users, events, selectedUser, setSelectedUser, fetchEvents }) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">
            📅 Event Dashboard
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            View and manage all events created by our amazing community.
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center mb-8">
          <label className="mr-3 font-semibold text-gray-700">
            Filter by User:
          </label>
          <select
            value={selectedUser}
            onChange={(e) => {
              setSelectedUser(e.target.value);
              fetchEvents(e.target.value);
            }}
            className="border-2 border-orange-500 rounded-full px-5 py-2 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="">All Users</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* Events Table */}
        <div className="overflow-x-auto shadow-xl rounded-2xl border border-gray-200 bg-white">
          <table className="w-full border-collapse">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="border p-4 text-left">Title</th>
                <th className="border p-4 text-left">Description</th>
                <th className="border p-4 text-left">City</th>
                <th className="border p-4 text-left">Date</th>
                <th className="border p-4 text-left">Created By</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-orange-50 transition">
                  <td className="border p-4 font-medium text-gray-900">{event.title}</td>
                  <td className="border p-4 text-gray-700">{event.description}</td>
                  <td className="border p-4">{event.city}</td>
                  <td className="border p-4">{event.date}</td>
                  <td className="border p-4 text-gray-600">
                    {event.users?.name || "Unknown"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ✅ Main Page
export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  async function fetchUsers() {
    let { data } = await supabase.from("users").select("*");
    if (data) setUsers(data);
  }

  async function fetchEvents(userId = "") {
    let query = supabase.from("events").select("*, users(name)");
    if (userId) query = query.eq("created_by", userId);
    let { data } = await query;
    if (data) setEvents(data);
  }

  useEffect(() => {
    fetchUsers();
    fetchEvents();
  }, []);

  return (
    <>
      <HeroSection />
      <EventDashboard
        users={users}
        events={events}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        fetchEvents={fetchEvents}
      />
    </>
  );
}
