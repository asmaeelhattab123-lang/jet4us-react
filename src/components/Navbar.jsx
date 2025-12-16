// src/components/Navbar.jsx
import { useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo1.png";
import { FaBell, FaUserCircle, FaGlobe, FaSearch, FaInfoCircle, FaPhone } from "react-icons/fa";

export default function Navbar({ currentPage, setCurrentPage }) {
  const menuLeftItems = ["Home", "Fly now", "Book seat", "Book jet", "More"];
  const menuRightItems = ["My Flight", "Jetmates", "Jet Set"];

  return (
    <header className="navbar">
      {/* Ligne du haut : Profil, Logo, Icônes */}
      <div className="navbar-top">
        <div className="navbar-left">
          {false && <FaUserCircle className="nav-icon profile-icon" title="Profile" />}
        </div>

        <div className="navbar-center">
          <img src={logo} alt="Jet4Us Logo" className="navbar-logo" />
        </div>

        <div className="navbar-right">
          <FaBell className="nav-icon" title="Notifications" />
          <FaSearch className="nav-icon" title="Search" />
          <FaPhone className="nav-icon" title="Contact Us" />
          <FaGlobe className="nav-icon" title="Language" />
          <FaInfoCircle className="nav-icon" title="Information" />
        </div>
      </div>

      {/* Ligne du bas : Menu principal */}
      <div className="navbar-menu-wrapper">
        <nav className="navbar-menu">
          <div className="menu-left">
            {menuLeftItems.map((item) => (
              <a
                key={item}
                href="#"
                className={currentPage === item ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(item); // Change la page active
                }}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="menu-right">
            {menuRightItems.map((item) => (
              <a
                key={item}
                href="#"
                className={currentPage === item ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(item); // Change la page active si besoin
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
