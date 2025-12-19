import { useEffect, useState } from "react";
import { getAirports } from "../api/airports.api";

export default function AirportSelect({ cityId, onSelect }) {
  const [search, setSearch] = useState("");
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    if (search.length >= 2) {
      getAirports(search, cityId).then(setAirports);
    }
  }, [search, cityId]);

  return (
    <div className="airport-select">
      <input
        type="text"
        placeholder="Airport"
        onChange={(e) => setSearch(e.target.value)}
      />

      {airports.length > 0 && (
        <ul>
          {airports.map(a => (
            <li
              key={a.id}
              onClick={() => {
                onSelect(a);
                setSearch(a.name);
                setAirports([]);
              }}
            >
              {a.name} ({a.iata_code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
