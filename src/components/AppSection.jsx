// src/components/AppSection.jsx
import React from "react";
import "./AppSection.css"; // ton CSS existant
import appImage from "../assets/Jet4usapp.png"; // image de l'application
import { FaGooglePlay, FaApple } from "react-icons/fa";

export default function AppSection() {
  return (
    <section className="app-section">
      {/* Image de l'application à gauche */}
      <div className="app-image">
        <img src={appImage} alt="Jet4us App" />
      </div>

      {/* Contenu texte à droite */}
      <div className="app-content">
        <h2>Your Gateway to Elite Travel: The Jet4us App</h2>
        <p>
          Experience the ultimate in luxury and convenience with the Jet4us App. 
          Seamlessly book private jet flights, manage your Jet Set network, and access 
          exclusive rewards through the Jet & Joy loyalty program—all at your fingertips.
        </p>

        {/* Boutons Google Play et App Store */}
        <div className="app-buttons">
          <a href="#" className="google-play">
            <FaGooglePlay className="icon" /> Get it on Google Play
          </a>
          <a href="#" className="app-store">
            <FaApple className="icon" /> Download on App Store
          </a>
        </div>
      </div>
    </section>
  );
}
