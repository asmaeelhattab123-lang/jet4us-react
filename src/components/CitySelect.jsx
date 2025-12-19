import { useEffect, useState } from "react";
import { getCities } from "../api/cities.api";

export default function CitySelect({ label, onSelect }) {
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (search.length >= 2) {
      getCities(search).then(setCities);
    } else {
      setCities([]);
    }
  }, [search]);

  return (
    <div className="city-select">
      <label>{label}</label>

      <input
        type="text"
        placeholder="City"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {cities.length > 0 && (
        <ul>
          {cities.map(city => (
            <li
              key={city.id}
              onClick={() => {
                onSelect(city);
                setSearch(city.name);
                setCities([]);
              }}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
