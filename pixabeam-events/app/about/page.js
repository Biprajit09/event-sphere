export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
          About This Project
        </h1>

        {/* Intro */}
        <p className="text-gray-600 mb-8 leading-relaxed text-center">
          This web application was built as part of my assessment project for{" "}
          <span className="font-semibold text-indigo-600">PixaBeam</span>. 
          It is a lightweight event management platform where users can register, 
          create events, and RSVP — all powered by Supabase.
        </p>

        {/* What It Does */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            🚀 What It Does
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Users can register and manage their profiles</li>
            <li>Events can be created with title, description, date, and location</li>
            <li>Participants can RSVP to events and update their status</li>
            <li>Data is stored securely in Supabase with real-time updates</li>
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            🛠️ Tech Stack
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Frontend:</span> Next.js (App Router), React, Tailwind CSS
            </p>
            <p>
              <span className="font-semibold">Backend / Database:</span> Supabase (Postgres + Auth + API)
            </p>
            <p>
              <span className="font-semibold">Deployment:</span> Vercel
            </p>
          </div>
        </section>

        {/* Purpose */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            🎯 Purpose
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The purpose of this project is to demonstrate database design, API integration, 
            and frontend development skills while building a practical event management solution. 
            It highlights my ability to work with full-stack tools and deliver a clean, functional app.
          </p>
        </section>

        {/* Outro */}
        <p className="text-gray-600 text-center italic">
          ✨ Thank you for reviewing this project as part of the assessment.
        </p>
      </div>
    </div>
  );
}
