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
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toValue, setToValue] = useState("");
  const [toSuggestions, setToSuggestions] = useState([]);
  const [displayedFlights, setDisplayedFlights] = useState(null);

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

  const flightsData = [
    { id: 1, image: marrakech, date: "24.12.2025", fromTime: "19:45", fromCity: "Marrakech", toTime: "23:00", toCity: "London", duration: "3h 15min", seatsLeft: 4, seatsTotal: 7, price: "50.00 USD", status: "open", type: "One way", jet: "Hawker 800 XPI", company: "Equajet" },
    { id: 2, image: rabat, date: "19.12.2025", fromTime: "06:30", fromCity: "Paris", toTime: "09:30", toCity: "Rabat", duration: "3h 00min", seatsLeft: 8, seatsTotal: 12, price: "31.66 USD", status: "confirmed", type: "One way", jet: "Gulfstream G550", company: "SkyFly" },
    { id: 3, image: dubai, date: "24.12.2025", fromTime: "19:45", fromCity: "Dubai", toTime: "23:00", toCity: "Madrid", duration: "3h 15min", seatsLeft: 4, seatsTotal: 7, price: "50.00 USD", status: "open", type: "One way", jet: "Hawker 900XP", company: "SkyFly" },
    { id: 4, image: barcelone, date: "19.12.2025", fromTime: "06:30", fromCity: "Barcelona", toTime: "09:30", toCity: "Paris", duration: "3h 00min", seatsLeft: 8, seatsTotal: 12, price: "31.66 USD", status: "confirmed", type: "One way", jet: "Gulfstream G650", company: "SkyFly" },
    { id: 5, image: rabat, date: "02.01.2026", fromTime: "14:10", fromCity: "Rabat", toTime: "18:40", toCity: "Madrid", duration: "4h 30min", seatsLeft: 6, seatsTotal: 10, price: "42.00 USD", status: "open", type: "One way", jet: "Cessna Citation XLS+", company: "JetStream" },
    { id: 6, image: paris, date: "08.01.2026", fromTime: "09:00", fromCity: "Rabat", toTime: "12:15", toCity: "Paris", duration: "3h 15min", seatsLeft: 2, seatsTotal: 8, price: "68.00 USD", status: "confirmed", type: "One way", jet: "Bombardier Challenger 350", company: "JetStream" },
  ];

  const handleFromInput = (e) => {
    const value = e.target.value;
    setFromValue(value);
    setFromSuggestions(locations.filter(loc => loc.name.toLowerCase().includes(value.toLowerCase())));
  };

  const handleToInput = (e) => {
    const value = e.target.value;
    setToValue(value);
    setToSuggestions(locations.filter(loc => loc.name.toLowerCase().includes(value.toLowerCase())));
  };

  const handleSelectFrom = (loc) => {
    setFromValue(loc.name);
    setFromSuggestions([]);
  };

  const handleSelectTo = (loc) => {
    setToValue(loc.name);
    setToSuggestions([]);
  };

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

        <div className="bookseat-search">
          <div className="autocomplete-box">
            <input type="text" placeholder="From: Airport or city" value={fromValue} onChange={handleFromInput} />
            {fromSuggestions.length > 0 && (
              <ul className="autocomplete-list">
                {fromSuggestions.map((loc, idx) => (
                  <li key={idx} onClick={() => handleSelectFrom(loc)}>
                    {loc.name} ({loc.type})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="autocomplete-box">
            <input type="text" placeholder="To: Airport or city" value={toValue} onChange={handleToInput} />
            {toSuggestions.length > 0 && (
              <ul className="autocomplete-list">
                {toSuggestions.map((loc, idx) => (
                  <li key={idx} onClick={() => handleSelectTo(loc)}>
                    {loc.name} ({loc.type})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button className="search-btn" onClick={handleSearch}>
            <FaSearch className="bookseat-search-icon" title="Search" />
          </button>
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="bookseat-actions">
        <div className="tabs">
          <button
            className={activeTab === "open" ? "active" : ""}
            onClick={() => { setActiveTab("open"); setDisplayedFlights(null); }}
          >
            Open flights
          </button>
          <button
            className={activeTab === "confirmed" ? "active" : ""}
            onClick={() => { setActiveTab("confirmed"); setDisplayedFlights(null); }}
          >
            Confirmed flights
          </button>
        </div>

        <button className="create-flight">✎ Create flight</button>
      </div>

      {/* FLIGHTS LIST */}
      <div className="bookseat-list">
        {flightsToShow.map(flight => (
          <div className={`flight-card ${flight.status}`} key={flight.id}>

            <div className="flight-photo">
  <img src={flight.image} alt={flight.toCity} />

  {/* Type de vol : Open = orange, Confirmed = vert */}
  <span className={`flight-type-overlay ${flight.status}`}>
    {flight.type}
  </span>

  {/* Type de jet en haut à droite */}
  <span className="flight-jet-overlay">{flight.jet}</span>
</div>


            {/* ROUTE + TIMES */}
            <div className="flight-info">
              <div className="flight-times">
                <div className="departure">
                  <span className="time">{flight.fromTime}</span>
                  <span className="city">{flight.fromCity}</span>
                </div>

                <div className="route-symbol-container">
                  {/* Date centrée */}
                  <span className="flight-date-text">{flight.date}</span>
                  <div className="route-symbol">
                     <span className="dots">• •</span>
                      <span className="jet-symbol">✈</span>
                      <span className="dots">• • •</span>
                  </div>
                </div>

                <div className="arrival">
                  <span className="time">{flight.toTime}</span>
                  <span className="city">{flight.toCity}</span>
                </div>
              </div>

              {/* SINGLE SEPARATOR */}
              <hr className={`flight-separator ${flight.status}`} />

              {/* FOOTER */}
              {flight.status === "confirmed" && (
                <div className="flight-footer">
                  <span className="company">{flight.company}</span>
                 <span className="seats">
  <img src={seatIcon} alt="Seat" className="seat-icon" />
  <span className="available">{flight.seatsLeft}</span>
  <span className="total">/{flight.seatsTotal}</span>
</span>

                  <span className="price">{flight.price}/seat</span>
                </div>
              )}

              {flight.status === "open" && (
                <div className="flight-footer open">
                  <span className="seats" style={{color: "#FFC107", fontWeight: "600"}}>
                    {flight.seatsLeft} 4seats available!
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
