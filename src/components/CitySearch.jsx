import { useState, useEffect } from "react";
import "./CitySearch.css";

export default function CitySearch({ placeholder, onSelect, compareCity = "" }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDuplicateError, setShowDuplicateError] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchCities = async () => {
      try {
        const res = await fetch(`http://localhost:5050/api/locations?query=${query}`);
        const cities = await res.json();

        const citiesWithAirports = await Promise.all(
          cities.map(async (city) => {
            const resAirports = await fetch(
              `http://localhost:5050/api/locations/airports?city=${encodeURIComponent(city.name)}&country=${city.country}`
            );
            const airports = await resAirports.json();
            return { ...city, airports: airports || [] };
          })
        );

        setResults(citiesWithAirports);
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCities();
  }, [query]);

  // 🔹 Popup villes identiques : comparer nom de la ville sélectionnée à compareCity
  useEffect(() => {
    const selectedCityName = query.split(" (")[0].toLowerCase(); 
    const compareCityName = compareCity.toLowerCase();          
    setShowDuplicateError(
      selectedCityName &&
      compareCityName &&
      selectedCityName === compareCityName
    );
  }, [query, compareCity]);

  // 🔹 Lors de la sélection d'une ville dans la liste
  const handleSelect = (city, airport) => {
    const name = airport
      ? `${city.name} (${city.country}) - ${airport.name} (${airport.iata || ""})`
      : `${city.name} (${city.country})`;

    setQuery(name);
    setShowDropdown(false);

    const selectedCityName = city.name.toLowerCase();
    const compareCityName = compareCity.toLowerCase();
    setShowDuplicateError(
      selectedCityName &&
      compareCityName &&
      selectedCityName === compareCityName
    );

    onSelect({ city, airport });
  };

  return (
    <div className="city-search-container">
      <div className="city-search-inner" style={{ position: "relative", overflow: "hidden" }}>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          style={{ width: "100%", paddingRight: "40px", boxSizing: "border-box", whiteSpace: "nowrap", overflowX: "auto", textOverflow: "ellipsis" }}
          onChange={(e) => {
            const val = e.target.value;
            setQuery(val);
            if (!val || val.trim() === "") {
              setResults([]);
              setShowDropdown(false);
            }
            setShowDuplicateError(false); // reset popup
          }}
          onFocus={() => query && setShowDropdown(true)}
        />

        {query && (
          <span
            className="clear-input"
            onClick={() => {
              setQuery("");
              setResults([]);
              setShowDropdown(false);
              setShowDuplicateError(false);
            }}
            style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", zIndex: 10, background: "rgba(90, 90, 90, 0.5)", padding: "2px 6px", borderRadius: "20%" }}
          >
            ✕
          </span>
        )}
      </div>

      {showDropdown && results.length > 0 && (
        <ul className="city-search-list">
          {results.map((item, idx) => (
            <li key={`${item.name}_${item.country}_${idx}`} className="city-search-item">
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                {item.name} ({item.country})
              </div>
              {item.airports && item.airports.length > 0 ? (
                <ul style={{ paddingLeft: "16px", marginTop: 0 }}>
                  {item.airports.map((a, aIdx) => (
                    <li key={`${a.name}_${aIdx}`} style={{ cursor: "pointer", marginBottom: "2px" }} onClick={() => handleSelect(item, a)}>
                      {a.name} {a.iata ? `(${a.iata})` : ""}
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ cursor: "pointer", fontStyle: "italic", color: "#666" }} onClick={() => handleSelect(item, null)}>
                  Aucun aéroport trouvé
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {showDuplicateError && (
        <div className="error-popup" style={{ position: "absolute", top: "100%", left: "0", background: "#ff4d4f", color: "#fff", padding: "8px 12px", borderRadius: "4px", marginTop: "4px", zIndex: 20 }}>
          From and To cannot be the same city
        </div>
      )}
    </div>
  );
}
