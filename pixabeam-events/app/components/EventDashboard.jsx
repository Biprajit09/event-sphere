"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import EventTable from "./EventTable";

export default function EventDashboard() {
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
        <EventTable events={events} />
      </div>
    </section>
  );
}
