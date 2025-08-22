export default function HeroSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          One Stop{" "}
          <span className="text-orange-600">Event Planner</span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Create, manage, and celebrate your events effortlessly.  
          Plan smarter with <span className="text-orange-600 font-semibold">EventSphere</span>.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/events"
            className="px-6 py-3 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-700 transition font-medium"
          >
            Get Started
          </a>
          <a
            href="/about"
            className="px-6 py-3 border-2 border-orange-600 text-orange-600 rounded-full shadow-md hover:bg-orange-600 hover:text-white transition font-medium"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
