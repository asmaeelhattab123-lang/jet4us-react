// App.jsx
import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import FlyNow from "./pages/FlyNowpage.jsx";
import BookSeat from "./pages/BookSeat.jsx";
import BookJet from "./pages/BookJet.jsx";
import MyFlights from "./pages/MyFlights.jsx"; // 🔹 import de ta page MyFlights

import "./App.css"; // 🔑 IMPORTANT : charge le layout global

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  // 🔹 State global pour les vols créés par l'utilisateur
  const [userFlights, setUserFlights] = useState([]);

  // 🔹 Fonction pour ajouter un vol
  const addUserFlight = (flight) => {
    setUserFlights((prev) => [...prev, flight]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <Home />;

      case "Fly now":
        return <FlyNow />;

      case "Book seat":
        return <BookSeat />;

      case "Book jet":
        // 🔹 passer addUserFlight à BookJet
        return <BookJet addUserFlight={addUserFlight} />;

      case "My Flights":
        // 🔹 passer userFlights à MyFlights
        return <MyFlights userFlights={userFlights} />;

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
        <Toaster position="top-right" /> {/* 🔹 ceci affiche les notifications */}
      </div>
    </AuthProvider>
  );
}
