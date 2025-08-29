import React from "react";

function Navbar({ page, setPage }) {
  return (
    <nav className="fixed top-0 left-0 w-full bg-indigo-600 text-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">🔗 URL Shortener</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setPage("home")}
            className={`px-3 py-2 rounded-md font-semibold transition ${
              page === "home"
                ? "bg-white text-indigo-600"
                : "hover:bg-indigo-500"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setPage("analytics")}
            className={`px-3 py-2 rounded-md font-semibold transition ${
              page === "analytics"
                ? "bg-white text-indigo-600"
                : "hover:bg-indigo-500"
            }`}
          >
            Analytics
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
