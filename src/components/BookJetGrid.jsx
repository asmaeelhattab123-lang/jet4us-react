// src/pages/BookJet.jsx
import { useState } from "react";
import "./BookJet.css";
import jetImage from "../assets/bookjet/jetint2.png";
import flight1 from "../assets/bookseat/marrakech.png";
import flight2 from "../assets/bookseat/paris2.png";
import seatIcon from "../assets/seats.svg";

export default function BookJet() {
  const [activeTab, setActiveTab] = useState("passengers");
  const [tripType, setTripType] = useState("oneway");
  const [jetSize, setJetSize] = useState(4);
  const [seats, setSeats] = useState(1);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const handleJetSizeChange = (e) => {
    const size = Number(e.target.value);
    setJetSize(size);
    setSeats(1);
  };

  const flights = [
    {
      id: 1, image: flight1, type: "Confirmed", status: "confirmed", jet: "Light Jet",
      company: "Jet4Us", date: "24.12.2025", fromTime: "19:45", fromCity: "Marrakech",
      toTime: "23:00", toCity: "London", seatsLeft: 4, seatsTotal: 7, price: "50.00 USD"
    },
    {
      id: 2, image: flight2, type: "Open", status: "open", jet: "Mid Jet",
      company: "Jet4Us", date: "19.12.2025", fromTime: "06:30", fromCity: "Marrakech",
      toTime: "09:30", toCity: "Paris", seatsLeft: 4, seatsTotal: 12, price: "31.66 USD"
    }
  ];

  // ==== Données des Trip Types ====
  const tripTypes = ["oneway", "roundtrip", "multicity"];
  const tabs = ["passengers", "airambulance"];
  const options = [
    { label: "Jet Size", type: "select", value: jetSize, onChange: handleJetSizeChange, options: [4, 7, 8, 9, 10, 19].map(s => ({ label: `${s} seats`, value: s })) },
    { label: "Seats", type: "select", value: seats, onChange: e => setSeats(Number(e.target.value)), options: [...Array(jetSize)].map((_, i) => ({ label: i + 1, value: i + 1 })) },
    { label: "Departure Date", type: "date" },
    { label: "Departure Time", type: "select", options: ["Morning", "Noon", "Evening", "Night"].map(t => ({ label: t, value: t.toLowerCase() })) },
    { label: "Flexibility Days", type: "select", options: ["1 week", "2 weeks", "3 weeks"].map(v => ({ label: v, value: v })) },
    { label: "Flexibility Distance", type: "select", options: ["50 km", "100 km", "150 km", "200 km"].map(v => ({ label: v, value: v })) }
  ];

  return (
    <section className="bookjet-page">

      {/* HERO */}
      <div className="bookjet-hero" style={{ backgroundImage: `url(${jetImage})` }}>
        <h1 className="bookjet-title">Book Jet</h1>
        <p className="bookjet-desc">
          Are you flying for business or privately? With partners, friends or family?
          Book the most convenient jet with the best offers.
        </p>

        {/* TABS */}
        <div className="bookjet-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* TRIP TYPES */}
        {activeTab === "passengers" && (
          <div className="trip-type">
            {tripTypes.map(type => (
              <button
                key={type}
                className={tripType === type ? "selected" : ""}
                onClick={() => setTripType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1).replace("oneway","One Way").replace("roundtrip","Round Trip").replace("multicity","Multi City")}
              </button>
            ))}
          </div>
        )}

        {/* FLIGHT FORM */}
        {activeTab === "passengers" && (
          <div className="flight-form">
            <div className="flight-inputs">
              {/* FROM / TO */}
              <div className="from-to">
                {["From", "To"].map((label, idx) => (
                  <div key={idx} className="input-box">
                    <label>{label}</label>
                    <input
                      type="text"
                      placeholder="City or Airport"
                      value={idx === 0 ? fromValue : toValue}
                      onChange={e => idx === 0 ? setFromValue(e.target.value) : setToValue(e.target.value)}
                    />
                    {idx === 0 && <div className="jet-symbol">✈</div>}
                  </div>
                ))}
              </div>

              {/* OPTIONS */}
              <div className="flight-options">
                {options.map((opt, idx) => (
                  <div key={idx} className="option-box">
                    <label>{opt.label}</label>
                    {opt.type === "select" ? (
                      <select value={opt.value} onChange={opt.onChange}>
                        {opt.options.map((o, i) => (
                          <option key={i} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    ) : opt.type === "date" ? (
                      <input type="date" />
                    ) : null}
                  </div>
                ))}
              </div>

              <button className="next-btn">Next</button>
            </div>
          </div>
        )}

        {/* FLIGHT CARDS */}
        <div className="flight-display">
          {flights.map(flight => (
            <div key={flight.id} className={`flight-card ${flight.status}`}>
              <div className="flight-photo">
                <img src={flight.image} alt={flight.toCity} />
                {[flight.type, flight.jet].map((text, idx) => (
                  <span key={idx} className={`flight-overlay flight-overlay-${idx} ${flight.status}`}>
                    {text}
                  </span>
                ))}
              </div>

              <div className="flight-info">
                {["departure","route","arrival"].map((section, idx) => {
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

      </div>
    </section>
  );
}
