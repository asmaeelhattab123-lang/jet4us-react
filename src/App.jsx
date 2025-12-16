// App.jsx
import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import FlyNow from "./pages/FlyNowpage.jsx";
import BookSeat from "./pages/BookSeat.jsx";
import BookJet from "./pages/BookJet.jsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  const renderPage = () => {
    switch (currentPage) {
      case "Home": return <Home />;
      case "Fly now": return <FlyNow />;
      case "Book seat": return <BookSeat />;
      case "Book jet": return <BookJet />;
      default: return <Home />;
    }
  };

  return (
    <AuthProvider>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </AuthProvider>
  );
}
