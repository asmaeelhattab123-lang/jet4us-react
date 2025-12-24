import { useState } from "react";
import FlyNowDetail from "./FlyNowDetail";
import "./FlyNowpage.css";

import romeImg from "../assets/offers/rome.png";
import parisImg from "../assets/offers/paris.png";
import londonImg from "../assets/offers/londre.png";
import dubaiImg from "../assets/offers/dubai.png";
import lagosImg from "../assets/offers/lagos.png";
import seatIcon from "../assets/seats.svg";


// Liste complète des vols
const flights = [
  {
    id: 2,
    photo: parisImg,
    type: "One way",
    jet: "Gulfstream G550",
    date: "02.02.25",
    departureTime: "14:00",
    departureCity: "Paris",
    departureAirport: "Charles de Gaulle Airport",
    arrivalTime: "16:30",
    arrivalCity: "Agadir",
    arrivalAirport: "Al Massira Airport",
    company: "SkyFly",
    seatsAvailable: 8,
    totalSeats: 13,
    price: "420 USD",
    code: "GFLP2A5Q",
    status: "Confirmed",
    operator: "SkyFly Operator",
    aircraft: "Gulfstream G550",
    expiration: { days: 1, hours: 12, minutes: 10 },
    seats: [
      { available: true },
      { available: true },
      { available: true },
      { available: true },
      { available: false },
    ],
  },
  {
    id: 3,
    photo: londonImg,
    type: "One way",
    jet: "Bombardier Challenger 350",
    date: "03.02.25",
    departureTime: "09:30",
    departureCity: "Rabat",
    departureAirport: "Rabat-Salé Airport",
    arrivalTime: "11:45",
    arrivalCity: "Tangier",
    arrivalAirport: "Tangier Ibn Battouta Airport",
    company: "JetStream",
    seatsAvailable: 0,
    totalSeats: 9,
    price: "420 USD",
    code: "BCH350R",
    status: "Confirmed",
    operator: "JetStream Operator",
    aircraft: "Bombardier Challenger 350",
    expiration: { days: 0, hours: 0, minutes: 0 },
    seats: [],
  },
  {
    id: 4,
    photo: romeImg,
    type: "One way",
    jet: "Gulfstream G650",
    date: "05.12.25",
    departureTime: "14:00",
    departureCity: "Paris",
    departureAirport: "Orly Airport",
    arrivalTime: "16:30",
    arrivalCity: "Dubai",
    arrivalAirport: "Dubai Intl Airport",
    company: "SkyFly",
    seatsAvailable: 10,
    totalSeats: 15,
    price: "420 USD",
    code: "G650DXB",
    status: "Confirmed",
    operator: "SkyFly Operator",
    aircraft: "Gulfstream G650",
    expiration: { days: 3, hours: 2, minutes: 15 },
    seats: [
      { available: true },
      { available: true },
      { available: true },
      { available: true },
      { available: true },
    ],
  },
  {
    id: 5,
    photo: dubaiImg,
    type: "One way",
    jet: "Hawker 900XP",
    date: "13.01.26",
    departureTime: "14:00",
    departureCity: "Dubai",
    departureAirport: "Dubai Intl Airport",
    arrivalTime: "16:30",
    arrivalCity: "Marrakech",
    arrivalAirport: "Marrakech Menara Airport",
    company: "SkyFly",
    seatsAvailable: 5,
    totalSeats: 7,
    price: "420 USD",
    code: "H900XPMA",
    status: "Confirmed",
    operator: "SkyFly Operator",
    aircraft: "Hawker 900XP",
    expiration: { days: 1, hours: 8, minutes: 0 },
    seats: [
      { available: true },
      { available: false },
      { available: true },
      { available: true },
    ],
  },
];

export default function FlyNow() {
  const [selectedFlight, setSelectedFlight] = useState(null);

  // Si un vol est sélectionné → afficher FlyNowDetail
  if (selectedFlight) {
    return (
      <FlyNowDetail
        flight={selectedFlight}
        onBack={() => setSelectedFlight(null)}
      />
    );
  }

  // Sinon → afficher la liste des vols comme avant
  return (
    <section className="flynow flynow-menu">
      <h1 className="flynow-title">Fly Now</h1>

      <div className="flynow-top">
        <p className="flynow-desc">
          Are you looking for an immediate departure from a closer airport?
          Fly Now allows you to book seats on any departing flights in the next
          48 hours.
        </p>
        <div className="flynow-search">
          <input type="text" placeholder="From: Airport or City" />
          <input type="text" placeholder="To: Airport or City" />
          <button>Search</button>
        </div>
      </div>

      <div className="flynow-cards">
        {flights
          .filter(flight => flight.seatsAvailable > 0)
          .map(flight => (
            <div
              className="flynow-card"
              key={flight.id}
              onClick={() => setSelectedFlight(flight)} // juste ça de ajouté
            >
              <div className="flight-photo">
                <img src={flight.photo} alt={flight.arrivalCity} />
                <span className="flight-type-overlay">{flight.type}</span>
                <span className="flight-jet-overlay">{flight.jet}</span>
              </div>

              <div className="flight-info">
                <div className="flight-times">
                  <div className="departure">
                    <span className="time">{flight.departureTime}</span>
                    <span className="city">{flight.departureCity}</span>
                  </div>

                  <div className="flynow-route-symbol-container">
                    <span className="flight-date-text">{flight.date}</span>
                    <div className="flynow-route-symbol">
                      <span className="flynow-dots">• •</span>
                      <span className="flynow-jet-symbol">✈</span>
                      <span className="flynow-dots">• • •</span>
                    </div>
                  </div>

                  <div className="arrival">
                    <span className="time">{flight.arrivalTime}</span>
                    <span className="city">{flight.arrivalCity}</span>
                  </div>
                </div>

                <hr className="flight-separator" />

                <div className="flight-footer">
                  <span className="company">{flight.company}</span>
                  <span className="seats">
                    <span className="seat-icon">
                      <img src={seatIcon} alt="Seat" />
                    </span>
                    <span className="seat-count">
                      <span className="available">{flight.seatsAvailable}</span>
                      <span className="available">/</span>
                      {flight.totalSeats}
                    </span>
                  </span>
                  <span className="price">{flight.price}/seat</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
