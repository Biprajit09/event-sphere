import Link from "next/link";
import "./globals.css";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* Navbar */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            
            {/* Logo / Brand */}
            <div className="text-2xl font-extrabold tracking-wide">
              <Link href="/" className="flex items-center space-x-1">
                <span className="text-orange-600">Event</span>
                <span className="text-gray-900">Sphere</span>
              </Link>
            </div>

            {/* Menu Links */}
            <div className="hidden md:flex gap-6 text-gray-700 font-medium">
              <Link href="/" className="hover:text-orange-600 transition">
                Home
              </Link>
              <Link href="/my-events" className="hover:text-orange-600 transition">
                My Events
              </Link>
              <Link href="/about" className="hover:text-orange-600 transition">
                About
              </Link>
              <Link href="/contact" className="hover:text-orange-600 transition">
                Contact
              </Link>
            </div>

            {/* Call to Action */}
            <div className="flex gap-3">
              {/* Add User Button */}
              <Link
                href="/add-user"
                className="px-4 py-2 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-700 transition"
              >
                + Add User
              </Link>

              {/* Add Event Button */}
              <Link
                href="/events"
                className="px-4 py-2 border-2 border-orange-600 text-orange-600 rounded-full shadow-md hover:bg-orange-600 hover:text-white transition"
              >
                + Add Event
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-10">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-100 mt-10 py-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Biprajit Choudhary. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
