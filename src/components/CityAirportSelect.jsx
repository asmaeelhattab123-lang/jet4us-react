import { useState } from "react";
import CitySearch from "./CitySearch";

export default function CityAirportSelect({ label, onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = ({ city, airport }) => {
    setSelected({ city, airport });
    onSelect({ city, airport });
  };

  return (
    <div className="city-airport-select">
      <label>{label}</label>
      <CitySearch
        placeholder={`Select ${label}`}
        onSelect={handleSelect}
      />
      {selected && (
        <div className="selected-info">
          {selected.city.name} ({selected.city.country}) 
          {selected.airport ? ` - ${selected.airport.name} (${selected.airport.iata})` : ""}
        </div>
      )}
    </div>
  );
}
