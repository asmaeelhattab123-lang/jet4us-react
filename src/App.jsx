// App.jsx
import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext.jsx";

import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import FlyNow from "./pages/FlyNowpage.jsx";
import BookSeat from "./pages/BookSeat.jsx";
import BookJet from "./pages/BookJet.jsx";

import "./App.css"; // 🔑 IMPORTANT : charge le layout global

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <Home />;

      case "Fly now":
        return <FlyNow />;

      case "Book seat":
        return <BookSeat />;

      case "Book jet":
        return <BookJet />;

      default:
        return <Home />;
    }
  };

  return (
    <AuthProvider>
      <div className="app">
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <main className="display">
          {renderPage()}
        </main>
      </div>
    </AuthProvider>
  );
}
