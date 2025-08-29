import React, { useState } from "react";
import Home from "./pages/home";
import Analytics from "./pages/analytics";
import Navbar from "./components/navbar";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar page={page} setPage={setPage} />

      {/* Page Content */}
      <div>
        {page === "home" && <Home />}
        {page === "analytics" && <Analytics />}
      </div>
    </div>
  );
}

export default App;
