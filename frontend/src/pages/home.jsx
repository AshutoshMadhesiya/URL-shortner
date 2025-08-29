import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/short-url`, {
        originalUrl: url,
      });
      setShortUrl(`${import.meta.env.VITE_BASE_URL}/${res.data.shortUrl}`);
    } catch (err) {
      setError("Failed to shorten URL. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2s
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          🔗 URL Shortener
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your long URL..."
            className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white rounded-xl py-3 hover:bg-indigo-700 transition font-semibold disabled:bg-gray-400"
          >
            {loading ? "Shortening..." : "Get Short URL"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {shortUrl && (
          <div className="mt-6 text-center">
            <p className="text-gray-700 mb-2">Your short link:</p>
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg border">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-semibold break-all"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="ml-3 bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
