import { supabase } from "./supabaseClient";

// 🔹 Get next ID (like E6, R21)
async function getNextId(table, prefix) {
  const { data, error } = await supabase
    .from(table)
    .select("id")
    .order("id", { ascending: false })
    .limit(1);

  if (error) throw error;
  if (data.length === 0) return prefix + "1";

  const lastId = data[0].id;
  const num = parseInt(lastId.replace(prefix, ""), 10) + 1;
  return prefix + num;
}

// 🔹 Add Event
export async function addEvent({ title, description, date, city, created_by }) {
  const newId = await getNextId("events", "E");

  const { data, error } = await supabase
    .from("events")
    .insert([
      { id: newId, title, description, date, city, created_by }
    ]);

  if (error) throw error;
  return data;
}

// 🔹 RSVP (insert or update)
export async function upsertRSVP({ user_id, event_id, status }) {
  const { data: existing } = await supabase
    .from("rsvps")
    .select("id")
    .eq("user_id", user_id)
    .eq("event_id", event_id)
    .single();

  let rsvpId;

  if (existing) {
    rsvpId = existing.id;
    const { data, error } = await supabase
      .from("rsvps")
      .update({ status })
      .eq("id", rsvpId);

    if (error) throw error;
    return data;
  } else {
    rsvpId = await getNextId("rsvps", "R");
    const { data, error } = await supabase
      .from("rsvps")
      .insert([{ id: rsvpId, user_id, event_id, status }]);

    if (error) throw error;
    return data;
  }
}

// 🔹 Get events by user_id
export async function getEventsByUser(userId) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("created_by", userId);

  if (error) throw error;
  return data;
}
