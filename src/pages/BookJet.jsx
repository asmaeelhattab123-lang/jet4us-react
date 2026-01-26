import { useState } from "react";
import "./BookJet.css";
import axios from "axios"; // utilisé pour le backend
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid"; // pour générer un ID unique
import CitySearch from "../components/CitySearch"; // reste inchangé
import jetImage from "../assets/bookjet/jetint2.png";
import flight1 from "../assets/bookseat/marrakech.png";
import flight2 from "../assets/bookseat/paris2.png";
import seatIcon from "../assets/seats.svg";



export default function BookJet({ addUserFlight }) {
  const [activeTab, setActiveTab] = useState("passengers");
  const [tripType, setTripType] = useState("oneway");
  const [jetSize, setJetSize] = useState(4);
  const [seats, setSeats] = useState(1);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("Morning");
  const [showDuplicateError, setShowDuplicateError] = useState(true);

  const handleJetSizeChange = (e) => {
    const size = Number(e.target.value);
    setJetSize(size);
    setSeats(1);
  };

  const [segments, setSegments] = useState([{ from: "", to: "", date: "", time: "" }]);

  const addSegment = () => setSegments([...segments, { from: "", to: "", date: "", time: "" }]);
  const removeSegment = (index) => setSegments(segments.filter((_, i) => i !== index));
  const updateSegment = (index, field, value) => {
    const updated = [...segments];
    updated[index][field] = value;
    setSegments(updated);
  };

  // Vols par défaut (Confirmed et Open)
 const [flights, setFlights] = useState([
  {
    id: 1,
    image: flight1,
    type: "Confirmed",
    status: "confirmed",
    jet: "Light Jet",
    company: "Jet4Us",
    date: "24.12.2025",
    fromTime: "19:45",
    fromCity: "Marrakech",
    toTime: "23:00",
    toCity: "London",
    seatsLeft: 4,
    seatsTotal: 7,
    price: "50.00 USD",
  },
  {
    id: 2,
    image: flight2,
    type: "Open",
    status: "open",
    jet: "Mid Jet",
    company: "Jet4Us",
    date: "19.12.2025",
    fromTime: "06:30",
    fromCity: "Marrakech",
    toTime: "09:30",
    toCity: "Paris",
    seatsLeft: 4,
    seatsTotal: 12,
    price: "31.66 USD",
  },
]);

  // 🔹 Nouvelle fonction handleNext pour backend + toast
  const handleNext = async () => {
    // validation simple
    if (!fromValue || !toValue || !date || !time) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (fromValue === toValue) {
      toast.error("Departure and arrival cannot be the same!", { duration: 4000 });
      return;
    }


    // création du vol
    const newFlight = {
      id: uuidv4(),
      fromCity: fromValue,
      toCity: toValue,

      // ✅ AJOUT IMPORTANT
  fromAirport: {
    name: fromSelection?.airport?.name || "",
    latitude: fromSelection?.airport?.latitude,
    longitude: fromSelection?.airport?.longitude,
  },

  toAirport: {
    name: toSelection?.airport?.name || "",
    latitude: toSelection?.airport?.latitude,
    longitude: toSelection?.airport?.longitude,
  },


      date,
      fromTime: time,
      toTime: time, // tu peux améliorer calcul durée réelle
      tripType,
      jet: jetSize + " seats Jet",
      seats,
      seatsTotal: jetSize,  // ✅
      seatsBooked: seats,   // nombre choisi par client
      price: "150 USD",
      company: "Private Jet",
      status: "private",
      type: tripType === "oneway" ? "One way" : tripType === "roundtrip" ? "Round trip" : "Multi city",
      image: flight1,
    };

    try {
      // 🔹 envoyer au backend
      const res = await axios.post("http://localhost:5050/api/flights", newFlight);

      // 🔹 notification animée
      toast.success("You have successfully booked your jet!");

      // 🔹 ajouter au state global pour MyFlights immédiat
      addUserFlight(res.data);

      // reset form
      setFromValue("");
      setToValue("");
      setDate("");
      setTime("Morning");
      setSeats(1);
    } catch (err) {
      console.error(err);
      toast.error("Booking failed. Try again.");
    }
  };

  return (
    <section className="bookjet-page">
      {/* HERO */}
      <div className="bookjet-hero" style={{ backgroundImage: `url(${jetImage})` }}>
        <h1 className="bookjet-title">Book Jet</h1>
        <p className="bookjet-desc">
          Are you flying for business or privately? With partners, friends or family? Book the most
          convenient jet with the best offers.
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

        {/* TRIP TYPE */}
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
      </div>

      {/* FLIGHT FORM */}
      {activeTab === "passengers" && (
        <div className="flight-form">
          <div className="flight-inputs">
            {(tripType === "oneway" || tripType === "roundtrip") && (
              <>
                <div className="from-to">
                  <div className="input-box">
                    <label>From</label>
                    <CitySearch
                    placeholder="City or Airport"
                   value={fromValue}
                  onChange={(val) => {
        setFromValue(val);
        setShowDuplicateError(false); // cache le message quand l'utilisateur tape
      }}
      onSelect={({ city, airport }) => {
        const fullName = airport ? `${city.name} (${city.country}) - ${airport.name}` : `${city.name} (${city.country})`;
        setFromValue(fullName);
        setShowDuplicateError(false); // cache le message
      }}    
                    />
                  </div>

                  <div className="jet-symbol">✈</div>

                  <div className="input-box">
                    <label>To</label>
                    <CitySearch
                    placeholder="City or Airport"
                    value={toValue}
                    onChange={(val) => {
        setToValue(val);
        setShowDuplicateError(false);
      }}
      onSelect={({ city, airport }) => {
        const fullName = airport ? `${city.name} (${city.country}) - ${airport.name}` : `${city.name} (${city.country})`;
        setToValue(fullName);
        setShowDuplicateError(false);
      }}
      inputClassName={fromValue === toValue && fromValue !== "" ? "error" : ""}
                    />
                {/* Popup message */}
    {fromValue === toValue && fromValue !== "" && showDuplicateError && (
      <div className="error-popup">
        From and To cannot be the same city
      </div>
    )}
                 
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
                    <select value={seats} onChange={(e) => setSeats(Number(e.target.value))}>
                      {[...Array(jetSize)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="option-box">
                    <label>Departure Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div className="option-box">
                    <label>Departure Time</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    >

                      <option>Morning</option>
                      <option>Noon</option>
                      <option>Evening</option>
                      <option>Night</option>
                    </select>
                  </div>

                  {tripType === "roundtrip" && (
                    <>
                      <div className="option-box">
                        <label>Return Date</label>
                        <input
                           type="date"
                           value={date}
                           onChange={(e) => setDate(e.target.value)}
                        />
                      </div>

                      <div className="option-box">
                        <label>Return Time</label>
                       <select
                         value={time}
                         onChange={(e) => setTime(e.target.value)}
                       >
                          <option>Morning</option>
                          <option>Noon</option>
                          <option>Evening</option>
                          <option>Night</option>
                        </select>
                      </div>

                      <div className="option-box">
                        <label>Departure Flexibility Days</label>
                        <select>
                          <option>1 day</option>
                          <option>3 days</option>
                          <option>1 week</option>
                          <option>2 weeks</option>
                          <option>3 weeks</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div className="option-box">
                    <label>Return Flexibility Days</label>
                    <select>
                      <option>1 day</option>
                      <option>3 days</option>
                      <option>1 week</option>
                      <option>2 weeks</option>
                      <option>3 weeks</option>
                    </select>
                  </div>

                  <div className="option-box">
                    <label>Flexibility Distance</label>
                    <select>
                      <option>0 km</option>
                      <option>50 km</option>
                      <option>100 km</option>
                      <option>150 km</option>
                      <option>200 km</option>
                      <option>300 km</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* MULTI CITY */}
            {tripType === "multicity" &&
              segments.map((segment, index) => (
                <div key={index} className="multicity-flight">
                  <div className="from-to">
                    <div className="input-box">
                      <label>From</label>
                     <CitySearch
                      placeholder="City or Airport"
                      onSelect={({ city, airport }) => updateSegment(index, "from", { city, airport })}
                     />
                    </div>

                    <div className="jet-symbol">✈</div>

                    <div className="input-box">
                      <label>To</label>
                      <CitySearch
                       placeholder="City or Airport"
                       onSelect={({ city, airport }) => updateSegment(index, "to", { city, airport })}
                      />
                    </div>

                    {index > 0 && (
                      <span className="remove-segment" onClick={() => removeSegment(index)}>
                        ❌
                      </span>
                    )}
                  </div>

                  <div className="flight-options">
                    {index === 0 && (
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
                    )}

                    <div className="option-box">
                      <label>Seats</label>
                      <select value={seats} onChange={(e) => setSeats(Number(e.target.value))}>
                        {[...Array(jetSize)].map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="option-box">
                      <label>Date</label>
                      <input
                        type="date"
                        value={segment.date}
                        onChange={(e) => updateSegment(index, "date", e.target.value)}
                      />
                    </div>

                    <div className="option-box">
                      <label>Time</label>
                      <select
                        value={segment.time}
                        onChange={(e) => updateSegment(index, "time", e.target.value)}
                      >
                        <option>Morning</option>
                        <option>Noon</option>
                        <option>Evening</option>
                        <option>Night</option>
                      </select>
                    </div>

                    <div className="option-box">
                      <label>Flexibility Days</label>
                      <select>
                        <option>1 day</option>
                        <option>3 days</option>
                        <option>1 week</option>
                        <option>2 weeks</option>
                        <option>3 weeks</option>
                      </select>
                    </div>

                    <div className="option-box">
                      <label>Flexibility Distance</label>
                      <select>
                        <option>0 km</option>
                        <option>50 km</option>
                        <option>100 km</option>
                        <option>150 km</option>
                        <option>200 km</option>
                        <option>300 km</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

            {tripType === "multicity" && (
              <button
                type="button"
                onClick={addSegment}
                className="add-flight-btn"
              >
                ➕ Add flight
              </button>
            )}

            <button className="next-btn" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {/* 🔥 FLIGHT CARDS FIXE A DROITE */}
      <div className="flight-display">
        {flights.map((flight) => (
          <div className={`flight-card ${flight.status}`} key={flight.id}>
            <div className="flight-photo">
              <img src={flight.image} alt={flight.toCity} />
              <span className={`flight-type-overlay ${flight.status}`}>{flight.type}</span>
              <span className="flight-jet-overlay">{flight.jet}</span>
            </div>

            <div className="flight-info">
              <div className="flight-times">
                <div className="departure">
                  <span className="time">{flight.fromTime}</span>
                  <span className="city">{flight.fromCity}</span>
                </div>

                <div className="route-symbol-container">
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

              <hr className={`flight-separator ${flight.status}`} />

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
