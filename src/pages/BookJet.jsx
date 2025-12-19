import { useState } from "react";
import "./BookJet.css";
import jetImage from "../assets/bookjet/jetint2.png";
import flight1 from "../assets/bookseat/marrakech.png";
import flight2 from "../assets/bookseat/paris2.png";

export default function BookJet() {
  const [activeTab, setActiveTab] = useState("passengers");
  const [tripType, setTripType] = useState("oneway");
  const [jetSize, setJetSize] = useState(4);
  const [seats, setSeats] = useState(1);
  const [fromValue, setFromValue] = useState("");
  const [fromType, setFromType] = useState("city");

  const [toValue, setToValue] = useState("");
  const [toType, setToType] = useState("city");

  const [results, setResults] = useState([]);

  const handleJetSizeChange = (e) => {
    const size = Number(e.target.value);
    setJetSize(size);
    setSeats(1); // reset seats when jet size changes
  };

  const flights = [
    {
      id: 1,
      image: flight1,
      date: "24.12.2025",
      fromTime: "19:45",
      fromCity: "Marrakech",
      toTime: "23:00",
      toCity: "London",
      duration: "3h 15min",
      seatsLeft: 4,
      seatsTotal: 7,
      price: "50.00 USD",
      status: "confirmed",
    },
    {
      id: 2,
      image: flight2,
      date: "19.12.2025",
      fromTime: "06:30",
      fromCity: "Marrakech",
      toTime: "09:30",
      toCity: "Paris",
      duration: "3h 00min",
      seatsLeft: 8,
      seatsTotal: 12,
      price: "31.66 USD",
      status: "confirmed",
    },
  ];

  return (
    <section className="bookjet-page">
      <div
        className="bookjet-hero"
        style={{ backgroundImage: `url(${jetImage})` }}
      >
        <h1 className="bookjet-title">Book Jet</h1>
        <p className="bookjet-desc">
          Are you flying for business or privately? With partners, friends or family?
          Book the most convenient jet with the best offers.
        </p>

        {/* TABS */}
        <div className="bookjet-tabs">
          <button
            className={activeTab === "passengers" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("passengers")}
          >
            Passengers
          </button>
          <button
            className={activeTab === "airambulance" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("airambulance")}
          >
            Air Ambulance
          </button>
        </div>

        {/* ✅ TRIP TYPE – EN DEHORS DU CONTAINER */}
        {activeTab === "passengers" && (
          <div className="trip-type">
            <button
              className={tripType === "oneway" ? "selected" : ""}
              onClick={() => setTripType("oneway")}
            >
              One Way
            </button>
            <button
              className={tripType === "roundtrip" ? "selected" : ""}
              onClick={() => setTripType("roundtrip")}
            >
              Round Trip
            </button>
            <button
              className={tripType === "multicity" ? "selected" : ""}
              onClick={() => setTripType("multicity")}
            >
              Multi City
            </button>
          </div>
        )}

        {/* ✅ BOX CONTAINER */}
        {activeTab === "passengers" && (
          <>
            <div className="flight-form">
              <div className="flight-inputs">
                {/* FROM / TO */}
                <div className="from-to">
                  <div className="input-box">
                    <label>From</label>
                    <input
                       type="text"
                       placeholder="City or Airport"
                       value={fromValue}
                       onChange={(e) => setFromValue(e.target.value)}
                    />
                  </div>

                  <div className="jet-symbol">✈</div>

                  <div className="input-box">
                    <label>To</label>
                    <input
                       type="text"
                       placeholder="City or Airport"
                       value={fromValue}
                       onChange={(e) => setFromValue(e.target.value)}
                    />

                  </div>
                </div>

                {/* OPTIONS */}
                <div className="flight-options">
                  <div className="option-box">
                    <label>Jet Size</label>
                    <select value={jetSize} onChange={handleJetSizeChange}>
                      <option value={4}>4 seats</option>
                      <option value={7}>7 seats</option>
                      <option value={8}>8 seats</option>
                      <option value={9}>9 seats</option>
                      <option value={10}>10 seats</option>
                      <option value={19}>19 seats</option>
                    </select>
                  </div>

                  <div className="option-box">
                    <label>Seats</label>
                    <select
                      value={seats}
                      onChange={(e) => setSeats(Number(e.target.value))}
                    >
                      {[...Array(jetSize)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="option-box">
                    <label>Departure Date</label>
                    <input type="date" />
                  </div>

                  <div className="option-box">
                    <label>Departure Time</label>
                    <select>
                      <option value="morning">Morning</option>
                      <option value="noon">Noon</option>
                      <option value="evening">Evening</option>
                      <option value="night">Night</option>
                    </select>
                  </div>

                  <div className="option-box">
                    <label>Flexibility Days</label>
                    <select>
                      <option>1 week</option>
                      <option>2 weeks</option>
                      <option>3 weeks</option>
                    </select>
                  </div>

                  <div className="option-box">
                    <label>Flexibility Distance</label>
                    <select>
                      <option>50 km</option>
                      <option>100 km</option>
                      <option>150 km</option>
                      <option>200 km</option>
                    </select>
                  </div>
                </div>

                <button className="next-btn">Next</button>
              </div>
            </div>

            {/* ✅ FLIGHT CARDS – EN DEHORS DU CONTAINER */}
            <div className="flight-display">
              {flights.map((flight) => (
                <div className="flight-card" key={flight.id}>
                  <div className="flight-image">
                    <img src={flight.image} alt="flight" />
                    <span className="flight-date">{flight.date}</span>
                  </div>

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

                    <div className={`flight-footer ${flight.status}`}>
                      <span>
                        {flight.seatsLeft} Seats left | {flight.seatsTotal}
                      </span>
                      <span className="price">{flight.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
