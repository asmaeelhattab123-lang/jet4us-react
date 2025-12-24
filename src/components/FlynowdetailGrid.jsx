import React, { useState, useEffect } from "react";
import { FaCircle, FaArrowLeft } from "react-icons/fa";
import seatIcon from "../assets/seats.svg";
import equaJetLogo from "../assets/equaJetLogo.png";
import hawkerLogo from "../assets/hawkerLogo.png";
import "./FlyNowDetail.css";

export default function FlyNowDetail({ flight, onBack }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [popup, setPopup] = useState(null);
  const [expiration, setExpiration] = useState(flight.expiration);

  // Toggle seat selection
  const toggleSeat = (idx) => {
    if (idx < flight.seatsAvailable) {
      setSelectedSeats((prev) =>
        prev.includes(idx)
          ? prev.filter((i) => i !== idx)
          : [...prev, idx]
      );
    }
  };

  // Calcul duration
  const calculateDuration = (dep, arr) => {
    const [dh, dm] = dep.split(":").map(Number);
    const [ah, am] = arr.split(":").map(Number);
    let depMinutes = dh * 60 + dm;
    let arrMinutes = ah * 60 + am;
    if (arrMinutes < depMinutes) arrMinutes += 24 * 60;
    const diff = arrMinutes - depMinutes;
    return { hours: Math.floor(diff / 60), minutes: diff % 60 };
  };

  const duration = calculateDuration(flight.departureTime, flight.arrivalTime);

  // Total price
  const seatPrice = parseFloat(flight.price);
  const totalPrice = selectedSeats.length ? seatPrice * selectedSeats.length : seatPrice;

  // Countdown expiration
  useEffect(() => {
    const interval = setInterval(() => {
      let { days, hours, minutes } = expiration;

      if (minutes > 0) minutes--;
      else {
        minutes = 59;
        if (hours > 0) hours--;
        else {
          hours = 23;
          if (days > 0) days--;
        }
      }

      setExpiration({ days, hours, minutes });
    }, 60000);

    return () => clearInterval(interval);
  }, [expiration]);

  // Badges (type + status)
  const badges = [
    { text: "One way", className: "one-way" },
    { text: flight.status, className: flight.status }
  ];

  // Operator / Aircraft buttons
  const buttons = [
    { type: "operator", logo: equaJetLogo, text: flight.company },
    { type: "aircraft", logo: hawkerLogo, text: flight.jet }
  ];

  return (
    <div className="flynow-detail-page">

      {/* Header */}
      <div className="flynow-header-and-details">
        <button className="back-arrow-btn" onClick={onBack}><FaArrowLeft /></button>
        <div className="flynow-title-section">
          <FaCircle className="flynow-red-circle" />
          <h2>Flight Details</h2>
        </div>

        {/* Flight main info */}
        <div className="flynow-detail-container">
          <div className="flight-code">{flight.code}</div>

          {/* Badges */}
          <div className="status-row">
            {badges.map((badge, i) => (
              <span key={i} className={`badge ${badge.className}`}>{badge.text}</span>
            ))}
          </div>

          {/* Departure / Arrival */}
          <div className="info-row">
            {["Departure", "Arrival"].map((label, idx) => (
              <div key={idx} className={`block ${idx === 0 ? "left" : "right"}`}>
                <div className="title">{label}</div>
                <div>{flight.date}</div>
                <div>{idx === 0 ? flight.departureTime : flight.arrivalTime}</div>
                <div className="label">{idx === 0 ? "From" : "To"}</div>
                <div>{idx === 0 ? flight.departureCity : flight.arrivalCity}</div>
                <div>{idx === 0 ? flight.departureAirport : flight.arrivalAirport}</div>
              </div>
            ))}
          </div>

          {/* Route symbol */}
          <div className="fly-now-details-route">
            <span className="fly-now-details-dots">······</span>
            <span className="fly-now-details-jet">✈</span>
            <span className="fly-now-details-dots">······</span>
          </div>

          {/* Operator / Aircraft */}
          <div className="flight-operator-aircraft">
            {buttons.map((btn, i) => (
              <button key={i} className={`${btn.type}-btn`} onClick={() => setPopup(btn.type)}>
                <img src={btn.logo} alt="" className="logo-img" />
                <span className="btn-text">{btn.text}</span>
              </button>
            ))}
          </div>

          {/* Duration & Expiration */}
          <div className="duration-expiration">
            <div className="duration-text">
              Duration: {duration.hours}h {duration.minutes}m
            </div>
            <div className="expiration-wrapper">
              <span className="expiration-label">Expires in:</span>
              <div className="expiration-text">
                {["days","hours","minutes"].map((unit) => (
                  <span key={unit} data-label={unit.charAt(0).toUpperCase() + unit.slice(1)}>
                    {expiration[unit]}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Seats */}
          <div className="flynow-detail-seats">
            {[...Array(flight.totalSeats)].map((_, idx) => (
              <div
                key={idx}
                className={`flynow-detail-seat ${idx < flight.seatsAvailable ? "available" : "unavailable"} ${selectedSeats.includes(idx) ? "selected" : ""}`}
                onClick={() => toggleSeat(idx)}
              >
                <img src={seatIcon} alt="Seat" />
              </div>
            ))}
            <span className="seat-count">{flight.seatsAvailable}/{flight.totalSeats} seats available</span>
            <div className="book-container">
              <span className="price">{totalPrice} USD</span>
              <button className="book-btn">Book</button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {popup && (
        <div className="popup-overlay" onClick={() => setPopup(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setPopup(null)}>&times;</button>
            {popup === "operator" && (
              <>
                <h3>Operator: {flight.company}</h3>
                <p>Information about the operator...</p>
              </>
            )}
            {popup === "aircraft" && (
              <>
                <h3>Aircraft: {flight.jet}</h3>
                <p>Information about the aircraft...</p>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
