"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Select from "react-select";

export default function AddEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [createdBy, setCreatedBy] = useState(null); // store selected user UUID
  const [users, setUsers] = useState([]); // list of users
  const [loading, setLoading] = useState(false);

  // Fetch users when page loads
  useEffect(() => {
    const fetchUsers = async () => {
      let { data, error } = await supabase.from("users").select("id, name");
      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(
          data.map((user) => ({
            value: user.id, // UUID
            label: user.name, // Name for UI
          }))
        );
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Insert Event
    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .insert([
        {
          title,
          description,
          date,
          city,
          created_by: createdBy?.value,
        },
      ])
      .select("id"); // get inserted event id

    if (eventError) {
      setLoading(false);
      alert("❌ Error adding event: " + eventError.message);
      return;
    }

    const eventId = eventData[0].id;

    // 2. Insert RSVPs for all users
    const rsvpEntries = users.map((user) => ({
      event_id: eventId,
      user_id: user.value,
      status: "Maybe", // default RSVP status
    }));

    const { error: rsvpError } = await supabase.from("rsvps").insert(rsvpEntries);

    setLoading(false);

    if (rsvpError) {
      alert("⚠️ Event added but RSVP creation failed: " + rsvpError.message);
      console.error(rsvpError);
    } else {
      alert("✅ Event and RSVPs created successfully!");
    }

    // Reset form
    setTitle("");
    setDescription("");
    setDate("");
    setCity("");
    setCreatedBy(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-md p-2"
            placeholder="Enter event title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md p-2"
            placeholder="Enter event description"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block mb-1 font-medium">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded-md p-2"
            placeholder="Enter event city"
            required
          />
        </div>

        {/* Created By */}
        <div>
          <label className="block mb-1 font-medium">Created By</label>
          <Select
            options={users}
            value={createdBy}
            onChange={setCreatedBy}
            placeholder="Search and select user"
            isSearchable
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

