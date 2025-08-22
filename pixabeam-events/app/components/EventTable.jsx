export default function EventTable({ events }) {
  return (
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
  );
}
