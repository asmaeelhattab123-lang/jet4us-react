import { useState } from "react";
import "./BookSeat.css";
import CitySearch from "../components/CitySearch.jsx";
import marrakech from "../assets/bookseat/marrakech2.png";
import paris from "../assets/bookseat/paris3.png";
import rabat from "../assets/bookseat/rabat.png";
import dubai from "../assets/bookseat/dubai1.png";
import barcelone from "../assets/bookseat/barcelone.png";
import rome from "../assets/bookseat/rome1.png";
import seatIcon from "../assets/seats.svg";
import createFlightVideo from "../assets/videos/create-flight.mp4";
import { FaSearch } from 'react-icons/fa';



export default function BookSeat() {
  const [activeTab, setActiveTab] = useState("open");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [displayedFlights, setDisplayedFlights] = useState(null);
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  


  // STATES pour CREATE FLIGHT
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [tripType, setTripType] = useState("oneway");
  const [jetSize, setJetSize] = useState(4);
  const [seats, setSeats] = useState(1);
  const [segments, setSegments] = useState([{ from: "", to: "", date: "", time: "" }]);

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
  const handleSelectFrom = (selection) => {
    setFromValue(selection.city.name);
    setFromLocation(selection);
  };

  const handleSelectTo = (selection) => {
    setToValue(selection.city.name);
    setToLocation(selection);
  };
 
  const handleSearch = () => {
  // 🔴 Popup villes identiques (MÊME LOGIQUE QUE FLY NOW)
  if (
    fromLocation &&
    toLocation &&
    fromLocation.city.name.toLowerCase() ===
      toLocation.city.name.toLowerCase()
  ) {
    alert("From and To cannot be the same city");
    setDisplayedFlights([]); // 👈 IMPORTANT pour BookSeat
    return;
  }

  const filtered = flightsData.filter((flight) => {
    const matchFrom =
      !fromLocation ||
      flight.fromCity.toLowerCase() ===
        fromLocation.city.name.toLowerCase();

    const matchTo =
      !toLocation ||
      flight.toCity.toLowerCase() ===
        toLocation.city.name.toLowerCase();

    return matchFrom && matchTo;
  });

  setDisplayedFlights(filtered);
};
  // MULTI CITY
  const addSegment = () => setSegments([...segments, { from: "", to: "", date: "", time: "" }]);
  const updateSegment = (index, field, value) => { const newSegments = [...segments]; newSegments[index][field] = value; setSegments(newSegments); };
  const removeSegment = (index) => setSegments(segments.filter((_, i) => i !== index));
  const handleJetSizeChange = (e) => { const size = Number(e.target.value); setJetSize(size); if (seats > size) setSeats(size); };

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
  <CitySearch
  placeholder="From: Airport or city"
  compareCity={toLocation?.city?.name || ""}   // ✅ IDENTIQUE À FLY NOW
  value={fromValue}
  onChange={setFromValue}
  onSelect={handleSelectFrom}
  classNames={{
    box: "autocomplete-box",
    input: "bookseat-input",
    list: "autocomplete-list",
    item: "autocomplete-item"
  }}
/>

 <CitySearch
  placeholder="To: Airport or city"
  compareCity={fromLocation?.city?.name || ""} // ✅ IDENTIQUE À FLY NOW
  value={toValue}
  onChange={setToValue}
  onSelect={handleSelectTo}
  classNames={{
    box: "autocomplete-box",
    input: "bookseat-input",
    list: "autocomplete-list",
    item: "autocomplete-item"
  }}
/>
  <button className="bookseat-search-btn" onClick={handleSearch}>
    <FaSearch className="bookseat-search-icon" title="Search" />
  </button>
</div>
      </div>

     {/* ACTION BAR */}
     <div className="bookseat-actions">
  <div className="tabs">
    <button
      className={!showCreateMenu && activeTab === "open" ? "active" : ""}
      onClick={() => {
        setActiveTab("open");
        setDisplayedFlights(null);
        setShowCreateMenu(false); // cacher create flight si ouvert
      }}
    >
      Open flights
    </button>
    <button
      className={!showCreateMenu && activeTab === "confirmed" ? "active" : ""}
      onClick={() => {
        setActiveTab("confirmed");
        setDisplayedFlights(null);
        setShowCreateMenu(false); // cacher create flight si ouvert
      }}
    >
      Confirmed flights
    </button>
  </div>

  <button
    className={`create-flight ${showCreateMenu ? "active" : ""}`} // bouton rouge si actif
    onClick={() => setShowCreateMenu(!showCreateMenu)}
  >
    ✎ Create flight
  </button>
</div>
       {/* TITRE + DESCRIPTION POUR CREATE FLIGHT */}
       {showCreateMenu && (
     <div className="create-flight-display">
        <h2 className="create-flight-title">Create Flight</h2>
        <p className="create-flight-desc">
        If you don’t find your desired flight, you can create your flight and share it with your jetmates or our clients. Enjoy your flight!
        </p>
     </div>
   )}

     {/* CREATE FLIGHT FORM */}
{showCreateMenu && (
  <div className="create-flight-layout">

    {/* LEFT FORM */}
    <div className="flight-form">
      <div className="flight-inputs">
      
        {/* TRIP TYPE SELECT */}
        <div className="trip-type-selector">
          <label>Trip Type:</label>
          <select value={tripType} onChange={(e)=>setTripType(e.target.value)}>
            <option value="oneway">One Way</option>
            <option value="roundtrip">Round Trip</option>
            <option value="multicity">Multi City</option>
          </select>
        </div>

        {/* ONE WAY / ROUND TRIP */}
        {(tripType==="oneway" || tripType==="roundtrip") && (
          <>
            <div className="from-to">
              <div className="input-box">
                <label>From</label>
                <CitySearch
                 placeholder="City or Airport"
                 value={fromValue}
                 onChange={setFromValue}
                compareValue={toValue}
                 />
              </div>
              <div className="jet-symbol">✈</div>
              <div className="input-box">
                <label>To</label>
               <CitySearch
                placeholder="City or Airport"
                value={toValue}
                onChange={setToValue}
               compareValue={fromValue}
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
                <select value={seats} onChange={(e)=>setSeats(Number(e.target.value))}>
                  {[...Array(jetSize)].map((_,i)=><option key={i} value={i+1}>{i+1}</option>)}
                </select>
              </div>
              <div className="option-box">
                <label>Departure Date</label>
                <input type="date" />
              </div>
              <div className="option-box">
                <label>Departure Time</label>
                <select>
                  <option>Morning</option>
                  <option>Noon</option>
                  <option>Evening</option>
                  <option>Night</option>
                </select>
              </div>
              {tripType==="roundtrip" && (
                <>
                  <div className="option-box"><label>Return Date</label><input type="date" /></div>
                  <div className="option-box"><label>Return Time</label>
                    <select>
                      <option>Morning</option>
                      <option>Noon</option>
                      <option>Evening</option>
                      <option>Night</option>
                    </select>
                  </div>
                  <div className="option-box"><label>Departure Flexibility Days</label>
                    <select>
                      <option>1 day</option><option>3 days</option><option>1 week</option><option>2 weeks</option><option>3 weeks</option>
                    </select>
                  </div>
                </>
              )}
              <div className="option-box"><label>Return Flexibility Days</label>
                <select>
                  <option>1 day</option><option>3 days</option><option>1 week</option><option>2 weeks</option><option>3 weeks</option>
                </select>
              </div>
              <div className="option-box"><label>Flexibility Distance</label>
                <select>
                  <option>0 km</option><option>50 km</option><option>100 km</option><option>150 km</option><option>200 km</option><option>300 km</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* MULTI CITY */}
        {tripType==="multicity" && segments.map((seg,index)=>(
          <div key={index} className="multicity-flight">
            <div className="from-to">
            <div className="input-box">
            <label>From</label>
        <CitySearch
          placeholder="City or Airport"
          value={seg.from}
          onChange={(val) => updateSegment(index, "from", val)}
          onSelect={({ city, airport }) => {
            updateSegment(index, "from", airport ? `${city.name} (${city.country}) - ${airport.name}` : `${city.name} (${city.country})`);
          }}
        />
      </div>
              <div className="jet-symbol">✈</div>
              <div className="input-box">
              <label>To</label>
        <CitySearch
          placeholder="City or Airport"
          value={seg.to}
          onChange={(val) => updateSegment(index, "to", val)}
          onSelect={({ city, airport }) => {
            updateSegment(index, "to", airport ? `${city.name} (${city.country}) - ${airport.name}` : `${city.name} (${city.country})`);
          }}
        />
      </div>
              {index>0 && <span className="remove-segment" onClick={()=>removeSegment(index)}>❌</span>}
            </div>
            <div className="flight-options">
              {index===0 && (
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
                <select value={seats} onChange={(e)=>setSeats(Number(e.target.value))}>
                  {[...Array(jetSize)].map((_,i)=><option key={i} value={i+1}>{i+1}</option>)}
                </select>
              </div>
              <div className="option-box">
                <label>Date</label><input type="date" value={seg.date} onChange={(e)=>updateSegment(index,"date",e.target.value)} />
              </div>
              <div className="option-box">
                <label>Time</label>
                <select value={seg.time} onChange={(e)=>updateSegment(index,"time",e.target.value)}>
                  <option>Morning</option><option>Noon</option><option>Evening</option><option>Night</option>
                </select>
              </div>
              <div className="option-box">
                <label>Flexibility Days</label>
                <select><option>1 day</option><option>3 days</option><option>1 week</option><option>2 weeks</option><option>3 weeks</option></select>
              </div>
              <div className="option-box">
                <label>Flexibility Distance</label>
                <select><option>0 km</option><option>50 km</option><option>100 km</option><option>150 km</option><option>200 km</option><option>300 km</option></select>
              </div>
            </div>
          </div>
        ))}
        {tripType==="multicity" && <button type="button" onClick={addSegment} className="add-flight-btn">➕ Add flight</button>}
        <button className="next-btn">Next</button>

      </div>
    </div>

    {/* RIGHT VIDEO */}
    <div className="create-flight-video">
      <h3>How to create a flight</h3>
      <video controls width="400" height="425">
        <source src={createFlightVideo} type="video/mp4" />
      </video>
    </div>

  </div>
)}

                
      {/* FLIGHTS LIST */}
      {!showCreateMenu && (
        <div className="bookseat-list">
          {flightsToShow.map(flight => (
            <div className={`flight-card ${flight.status}`} key={flight.id}>
              <div className="flight-photo">
                <img src={flight.image} alt={flight.toCity} />
                <span className={`flight-type-overlay ${flight.status}`}>{flight.type}</span>
                <span className="flight-jet-overlay">{flight.jet}</span>
              </div>
              <div className="flight-info">
                <div className="flight-times">
                  <div className="departure"><span className="time">{flight.fromTime}</span><span className="city">{flight.fromCity}</span></div>
                  <div className="route-symbol-container">
                    <span className="flight-date-text">{flight.date}</span>
                    <div className="route-symbol"><span className="dots">• •</span><span className="jet-symbol">✈</span><span className="dots">• • •</span></div>
                  </div>
                  <div className="arrival"><span className="time">{flight.toTime}</span><span className="city">{flight.toCity}</span></div>
                </div>
                <hr className={`flight-separator ${flight.status}`} />
                {flight.status==="confirmed" ? (
                  <div className="flight-footer">
                    <span className="company">{flight.company}</span>
                    <span className="seats"><img src={seatIcon} alt="Seat" className="seat-icon" /><span className="available">{flight.seatsLeft}</span><span className="total">/{flight.seatsTotal}</span></span>
                    <span className="price">{flight.price}/seat</span>
                  </div>
                ) : (
                   <div className="flight-footer open">
                  <span className="seats" style={{color: "#FFC107", fontWeight: "600"}}>{flight.seatsLeft} 4seats available!</span>
                  <span className="price">{flight.price}/seat</span>
                </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
