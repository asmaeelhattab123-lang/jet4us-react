import { useState } from "react";
import "./BookSeat.css";
import marrakech from "../assets/bookseat/marrakech2.png";
import paris from "../assets/bookseat/paris3.png";
import rabat from "../assets/bookseat/rabat.png";
import dubai from "../assets/bookseat/dubai1.png";
import barcelone from "../assets/bookseat/barcelone.png";
import Rome from "../assets/bookseat/rome1.png";
export default function BookSeat() {
  const [activeTab, setActiveTab] = useState("open");

  const flights = [
    {
      id: 1,
      image: marrakech,
      date: "24.12.2025",
      fromTime: "19:45",
      fromCity: "Marrakech",
      toTime: "23:00",
      toCity: "London",
      duration: "3h 15min",
      seatsLeft: 4,
      seatsTotal: 7,
      price: "50.00 USD",
      status: "open",
    },
    {
      id: 2,
      image: rabat,
      date: "19.12.2025",
      fromTime: "06:30",
      fromCity: "Paris",
      toTime: "09:30",
      toCity: "Rabat",
      duration: "3h 00min",
      seatsLeft: 8,
      seatsTotal: 12,
      price: "31.66 USD",
      status: "confirmed",
    },
    {
    id: 3,
    image: dubai,
    date: "24.12.2025",
    fromTime: "19:45",
    fromCity: "Dubai",
    toTime: "23:00",
    toCity: "Mdrid",
    duration: "3h 15min",
    seatsLeft: 4,
    seatsTotal: 7,
    price: "50.00 USD",
    status: "open",
  },
  {
    id: 4,
    image: barcelone,
    date: "19.12.2025",
    fromTime: "06:30",
    fromCity: "Brcelone",
    toTime: "09:30",
    toCity: "Paris",
    duration: "3h 00min",
    seatsLeft: 8,
    seatsTotal: 12,
    price: "31.66 USD",
    status: "confirmed",
  },
  {
    id: 5,
    image: rabat,
    date: "02.01.2026",
    fromTime: "14:10",
    fromCity: "rabat",
    toTime: "18:40",
    toCity: "Madrid",
    duration: "4h 30min",
    seatsLeft: 6,
    seatsTotal: 10,
    price: "42.00 USD",
    status: "open",
  },
  {
    id: 6,
    image: paris,
    date: "08.01.2026",
    fromTime: "09:00",
    fromCity: "Rabat",
    toTime: "12:15",
    toCity: "paris",
    duration: "3h 15min",
    seatsLeft: 2,
    seatsTotal: 8,
    price: "68.00 USD",
    status: "confirmed",
  },
  ];

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
          <input type="text" placeholder="From: Airport or city" />
          <input type="text" placeholder="To: Airport or city" />
          <button className="search-btn">🔍</button>
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="bookseat-actions">
        <div className="tabs">
          <button 
            className={activeTab === "open" ? "active" : ""} 
            onClick={() => setActiveTab("open")}
          >
            Open flights
          </button>
          <button 
            className={activeTab === "confirmed" ? "active" : ""} 
            onClick={() => setActiveTab("confirmed")}
          >
            Confirmed flights
          </button>
        </div>

        <button className="create-flight">✎ Create flight</button>
      </div>

      {/* FLIGHTS LIST */}
      <div className="bookseat-list">
        {flights
          .filter(flight => flight.status === activeTab)
          .map(flight => (
            <div className={`flight-card ${flight.status}`} key={flight.id}>

              {/* IMAGE + DATE */}
              <div className="flight-image">
                <img src={flight.image} alt="flight" />
                <span className="flight-date">{flight.date}</span>
              </div>

              {/* INFO */}
              <div className="flight-info">
                <div className="flight-route">
                  <div>
                    <strong>{flight.fromTime}</strong>
                    <span>{flight.fromCity}</span>
                  </div>

                  <div className="flight-line">
                    <span>{flight.duration}</span>
                  </div>

                  <div>
                    <strong>{flight.toTime}</strong>
                    <span>{flight.toCity}</span>
                  </div>
                </div>

                {/* FOOTER AVEC SEPARATEUR HORIZONTAL */}
                <div className={`flight-footer ${flight.status}`}>
                  <span className="seats">
                    {flight.seatsLeft} Seats left | {flight.seatsTotal}
                  </span>
                  <span className="price">{flight.price}</span>
                </div>

              </div>

            </div>
        ))}
      </div>
    </section>
  );
}
