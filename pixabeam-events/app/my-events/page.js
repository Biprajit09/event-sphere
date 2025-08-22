"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function MyEventsPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [createdEvents, setCreatedEvents] = useState([]);
  const [rsvpEvents, setRsvpEvents] = useState([]);

  // Fetch users
  useEffect(() => {
    async function fetchUsers() {
      let { data, error } = await supabase.from("users").select("*");
      if (error) console.error(error);
      else setUsers(data);
    }
    fetchUsers();
  }, []);

  // Fetch created events
  async function fetchCreatedEvents(userId) {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("created_by", userId);
    if (error) console.error(error);
    else setCreatedEvents(data);
  }

  // Fetch RSVP events
  async function fetchRsvpEvents(userId) {
    const { data, error } = await supabase
      .from("rsvps")
      .select("id, status, event_id, events(title, description, date, city)")
      .eq("user_id", userId);

    if (error) console.error(error);
    else setRsvpEvents(data);
  }

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
    fetchCreatedEvents(userId);
    fetchRsvpEvents(userId);
  };

  async function handleRsvpChange(rsvpId, newStatus, index) {
    const { error } = await supabase
      .from("rsvps")
      .update({ status: newStatus })
      .eq("id", rsvpId);

    if (error) {
      console.error("Error updating RSVP:", error);
    } else {
      const updatedRsvpEvents = [...rsvpEvents];
      updatedRsvpEvents[index].status = newStatus;
      setRsvpEvents(updatedRsvpEvents);
    }
  }

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        🎟️ My Events Dashboard
      </h1>

      {/* User Selection */}
      <div className="mb-10 flex items-center gap-4">
        <label className="font-semibold text-gray-700">Select User:</label>
        <select
          value={selectedUser}
          onChange={(e) => handleUserSelect(e.target.value)}
          className="border rounded-lg px-4 py-2 shadow-sm bg-white focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">-- Select a User --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      {/* Events Section */}
      {selectedUser && (
        <div className="space-y-12">
          {/* Created Events */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              ✏️ Events I Created
            </h2>
            {createdEvents.length > 0 ? (
              <div className="overflow-x-auto shadow-lg rounded-xl border bg-white">
                <table className="w-full border-collapse">
                  <thead className="bg-indigo-100 text-indigo-800">
                    <tr>
                      <th className="border p-3 text-left">Title</th>
                      <th className="border p-3 text-left">Description</th>
                      <th className="border p-3 text-left">Date</th>
                      <th className="border p-3 text-left">City</th>
                    </tr>
                  </thead>
                  <tbody>
                    {createdEvents.map((ev) => (
                      <tr
                        key={ev.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="border p-3">{ev.title}</td>
                        <td className="border p-3">{ev.description}</td>
                        <td className="border p-3">{ev.date}</td>
                        <td className="border p-3">{ev.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 italic">No events created yet.</p>
            )}
          </div>

          {/* RSVP Events */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              ✅ Events I RSVP’d To
            </h2>
            {rsvpEvents.length > 0 ? (
              <div className="overflow-x-auto shadow-lg rounded-xl border bg-white">
                <table className="w-full border-collapse">
                  <thead className="bg-green-100 text-green-800">
                    <tr>
                      <th className="border p-3 text-left">Title</th>
                      <th className="border p-3 text-left">Description</th>
                      <th className="border p-3 text-left">Date</th>
                      <th className="border p-3 text-left">City</th>
                      <th className="border p-3 text-left">RSVP Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rsvpEvents.map((r, i) => (
                      <tr
                        key={r.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="border p-3">{r.events.title}</td>
                        <td className="border p-3">{r.events.description}</td>
                        <td className="border p-3">{r.events.date}</td>
                        <td className="border p-3">{r.events.city}</td>
                        <td className="border p-3">
                          <select
                            value={r.status}
                            onChange={(e) =>
                              handleRsvpChange(r.id, e.target.value, i)
                            }
                            className="border rounded-lg px-3 py-1 bg-white shadow-sm focus:ring-2 focus:ring-green-400"
                          >
                            <option value="Yes">✅ Yes</option>
                            <option value="No">❌ No</option>
                            <option value="Maybe">🤔 Maybe</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 italic">No RSVP records yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
