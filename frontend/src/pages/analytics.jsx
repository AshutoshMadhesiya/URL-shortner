import React, { useState } from "react";
import axios from "axios";

const Analytics = () => {
  const [shortCode, setShortCode] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAnalytics = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnalytics(null);

    try {
      // Extract shortCode even if full URL is pasted
      let code = shortCode.trim();
      if (code.includes("/")) {
        code = code.split("/").pop();
      }

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/analytics/${code}`
      );
      setAnalytics(res.data);
    } catch (err) {
      setError("Failed to fetch analytics. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          📊 URL Analytics
        </h1>

        {/* Input */}
        <form onSubmit={fetchAnalytics} className="flex gap-3 mb-6">
          <input
            type="text"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            placeholder="Paste short URL or code"
            className="flex-1 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white rounded-xl px-6 py-3 hover:bg-indigo-700 transition font-semibold disabled:bg-gray-400"
          >
            {loading ? "Loading..." : "Check"}
          </button>
        </form>

        {/* Error */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Analytics */}
        {analytics && (
          <div className="space-y-4">
            <p>
              <span className="font-semibold">Original URL: </span>
              <a
                href={analytics.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline break-all"
              >
                {analytics.originalUrl}
              </a>
            </p>
            <p>
              <span className="font-semibold">Short URL: </span>
              <a
                href={`${import.meta.env.VITE_BASE_URL}/${analytics.shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-medium hover:underline"
              >
                {`${import.meta.env.VITE_BASE_URL}/${analytics.shortUrl}`}
              </a>
            </p>

            <p>
              <span className="font-semibold">Created At: </span>
              {new Date(analytics.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Total Clicks: </span>
              {analytics.visitedHistory.length}
            </p>

            {/* Table of visits */}
            {/* Table of visits */}
            <div>
              <h2 className="font-semibold mb-2">Visit History:</h2>
              {analytics.visitedHistory.length === 0 ? (
                <p className="text-gray-500">No visits yet</p>
              ) : (
                <div className="max-h-48 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                  <ul className="list-disc pl-6 space-y-1">
                    {analytics.visitedHistory
                      .slice() // show only last 8 entries
                      .reverse() // so newest appears at top
                      .map((visit) => (
                        <li key={visit._id}>
                          {new Date(visit.date).toLocaleString()}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
