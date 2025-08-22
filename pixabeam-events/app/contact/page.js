export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-3xl mx-auto bg-orange-50 border border-orange-200 shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-orange-600 text-center">
          📬 Contact Me
        </h1>

        {/* Intro */}
        <p className="text-gray-700 mb-8 leading-relaxed text-center">
          This project was built as part of an assessment for{" "}
          <span className="font-semibold text-orange-600">PixaBeam</span>.  
          You can reach me through the following channels:
        </p>

        {/* Contact Info */}
        <ul className="space-y-6 text-gray-800">
          <li className="flex items-center gap-3 p-4 border border-orange-200 rounded-lg bg-white shadow-sm hover:shadow-md transition">
            <span className="text-xl text-orange-500">📱</span>
            <div>
              <span className="font-semibold">Mobile: </span>
              <a
                href="tel:+918793698873"
                className="text-orange-600 hover:underline"
              >
                +91 87936 98873
              </a>
            </div>
          </li>

          <li className="flex items-center gap-3 p-4 border border-orange-200 rounded-lg bg-white shadow-sm hover:shadow-md transition">
            <span className="text-xl text-orange-500">📧</span>
            <div>
              <span className="font-semibold">Email: </span>
              <a
                href="mailto:choudharybiprajit@gmail.com"
                className="text-orange-600 hover:underline"
              >
                choudharybiprajit@gmail.com
              </a>
            </div>
          </li>

          <li className="flex items-center gap-3 p-4 border border-orange-200 rounded-lg bg-white shadow-sm hover:shadow-md transition">
            <span className="text-xl text-orange-500">💼</span>
            <div>
              <span className="font-semibold">LinkedIn: </span>
              <a
                href="https://www.linkedin.com/in/biprajitchoudhary09/"
                className="text-orange-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/biprajitchoudhary09
              </a>
            </div>
          </li>

          <li className="flex items-center gap-3 p-4 border border-orange-200 rounded-lg bg-white shadow-sm hover:shadow-md transition">
            <span className="text-xl text-orange-500">🌐</span>
            <div>
              <span className="font-semibold">Portfolio: </span>
              <a
                href="https://biprajitportfolioweb.netlify.app/"
                className="text-orange-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                biprajitportfolioweb.netlify.app
              </a>
            </div>
          </li>
        </ul>

        {/* Outro */}
        <p className="text-gray-600 text-center mt-10 italic">
          ✨ Always open to collaborations and new opportunities.
        </p>

        {/* Back to Home Button */}
        <div className="flex justify-center mt-6">
          <a
            href="/"
            className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-full shadow-md hover:bg-orange-600 transition"
          >
            ⬅ Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
