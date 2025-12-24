// src/pages/BookSeat.jsx
import { useState } from "react";
import "./BookSeat.css";
import marrakech from "../assets/bookseat/marrakech2.png";
import paris from "../assets/bookseat/paris3.png";
import rabat from "../assets/bookseat/rabat.png";
import dubai from "../assets/bookseat/dubai1.png";
import barcelone from "../assets/bookseat/barcelone.png";
import rome from "../assets/bookseat/rome1.png";
import seatIcon from "../assets/seats.svg";
import { FaSearch } from 'react-icons/fa';

export default function BookSeat() {
  const [activeTab, setActiveTab] = useState("open");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [displayedFlights, setDisplayedFlights] = useState(null);

  // ==== Données des lieux ====
  const locations = [
    { name: "Marrakech", type: "city" },
    { name: "Paris", type: "city" },
    { name: "Rabat", type: "city" },
    { name: "Dubai", type: "city" },
    { name: "Barcelona", type: "city" },
    { name: "Rome", type: "city" },
    { name: "London Heathrow", type: "airport" },
    { name: "Paris Charles de Gaulle", type: "airport" },
    { name: "Dubai International", type: "airport" },
    { name: "JFK", type: "airport" },
    { name: "Narita", type: "airport" },
    { name: "Madrid Barajas", type: "airport" },
  ];

  // ==== Données des vols ====
  const flightsData = [
    {
      id: 1, image: marrakech, date: "24.12.2025", fromTime: "19:45", fromCity: "Marrakech",
      toTime: "23:00", toCity: "London", duration: "3h 15min", seatsLeft: 4, seatsTotal: 7,
      price: "50.00 USD", status: "open", type: "One way", jet: "Hawker 800 XPI", company: "Equajet"
    },
    {
      id: 2, image: rabat, date: "19.12.2025", fromTime: "06:30", fromCity: "Paris",
      toTime: "09:30", toCity: "Rabat", duration: "3h 00min", seatsLeft: 8, seatsTotal: 12,
      price: "31.66 USD", status: "confirmed", type: "One way", jet: "Gulfstream G550", company: "SkyFly"
    },
    // ... autres vols
  ];

  // ==== Fonctions autocomplete ====
  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (type === "from") {
      setFromValue(value);
      setFromSuggestions(locations.filter(loc => loc.name.toLowerCase().includes(value.toLowerCase())));
    } else {
      setToValue(value);
      setToSuggestions(locations.filter(loc => loc.name.toLowerCase().includes(value.toLowerCase())));
    }
  };

  const handleSelectLocation = (loc, type) => {
    if (type === "from") {
      setFromValue(loc.name);
      setFromSuggestions([]);
    } else {
      setToValue(loc.name);
      setToSuggestions([]);
    }
  };

  // ==== Recherche ====
  const handleSearch = () => {
    const filtered = flightsData.filter(f =>
      (fromValue ? f.fromCity.toLowerCase().includes(fromValue.toLowerCase()) : true) &&
      (toValue ? f.toCity.toLowerCase().includes(toValue.toLowerCase()) : true)
    );
    setDisplayedFlights(filtered);
  };

  const flightsToShow = displayedFlights || flightsData.filter(f => f.status === activeTab);

  return (
    <section className="page-display bookseat-bg">

      {/* HERO */}
      <div className="bookseat-hero">
        <h1 className="bookseat-title">Book Seat</h1>
        <p className="bookseat-desc">
          jet4as allows to book one or more seats on confirmed flights, pay and fly.
          You can also book seats on an open flight that is not confirmed yet.
        </p>

        {/* Autocomplete Inputs */}
        <div className="bookseat-search">
          {[
            { value: fromValue, suggestions: fromSuggestions, placeholder: "From: Airport or city", type: "from" },
            { value: toValue, suggestions: toSuggestions, placeholder: "To: Airport or city", type: "to" }
          ].map((input, idx) => (
            <div key={idx} className="autocomplete-box">
              <input
                type="text"
                placeholder={input.placeholder}
                value={input.value}
                onChange={e => handleInputChange(e, input.type)}
              />
              {input.suggestions.length > 0 && (
                <ul className="autocomplete-list">
                  {input.suggestions.map((loc, i) => (
                    <li key={i} onClick={() => handleSelectLocation(loc, input.type)}>
                      {loc.name} ({loc.type})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <button className="search-btn" onClick={handleSearch}>
            <FaSearch className="bookseat-search-icon" title="Search" />
          </button>
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="bookseat-actions">
        {["open", "confirmed"].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => { setActiveTab(tab); setDisplayedFlights(null); }}
          >
            {tab === "open" ? "Open flights" : "Confirmed flights"}
          </button>
        ))}
        <button className="create-flight">✎ Create flight</button>
      </div>

      {/* FLIGHTS LIST */}
      <div className="bookseat-list">
        {flightsToShow.map(flight => (
          <div key={flight.id} className={`flight-card ${flight.status}`}>

            {/* Photo + overlay */}
            <div className="flight-photo">
              <img src={flight.image} alt={flight.toCity} />
              {[flight.type, flight.jet].map((text, idx) => (
                <span key={idx} className={`flight-overlay flight-overlay-${idx} ${flight.status}`}>
                  {text}
                </span>
              ))}
            </div>

            {/* Route + Times */}
            <div className="flight-info">
              {["departure", "route", "arrival"].map((section, idx) => {
                if (section === "departure") return (
                  <div key={idx} className="departure">
                    <span className="time">{flight.fromTime}</span>
                    <span className="city">{flight.fromCity}</span>
                  </div>
                );
                if (section === "arrival") return (
                  <div key={idx} className="arrival">
                    <span className="time">{flight.toTime}</span>
                    <span className="city">{flight.toCity}</span>
                  </div>
                );
                return (
                  <div key={idx} className="route-symbol-container">
                    <span className="flight-date-text">{flight.date}</span>
                    <div className="route-symbol">
                      <span className="dots">• •</span>
                      <span className="jet-symbol">✈</span>
                      <span className="dots">• • •</span>
                    </div>
                  </div>
                );
              })}

              <hr className={`flight-separator ${flight.status}`} />

              {/* FOOTER */}
              {flight.status === "confirmed" ? (
                <div className="flight-footer">
                  <span className="company">{flight.company}</span>
                  <span className="seats">
                    <img src={seatIcon} alt="Seat" className="seat-icon" />
                    <span className="available">{flight.seatsLeft}</span>
                    <span className="total">/{flight.seatsTotal}</span>
                  </span>
                  <span className="price">{flight.price}/seat</span>
                </div>
              ) : (
                <div className="flight-footer open">
                  <span className="seats" style={{ color: "#FFC107", fontWeight: "600" }}>
                    {flight.seatsLeft} seats available!
                  </span>
                  <span className="price">{flight.price}/seat</span>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
