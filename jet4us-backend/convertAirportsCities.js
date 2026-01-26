import fs from "fs";

// 🔹 Charger le JSON téléchargé
const airportsData = JSON.parse(fs.readFileSync("data/airports.json", "utf-8"));

// 🔹 Créer un objet regroupé par ville + pays
const citiesWithAirports = {};

for (const key in airportsData) {
  const airport = airportsData[key];

  if (!airport.city || !airport.country) continue;

  const cityKey = `${airport.city}||${airport.country}`;

  if (!citiesWithAirports[cityKey]) {
    citiesWithAirports[cityKey] = {
      city: airport.city,
      country: airport.country,
      airports: []
    };
  }

  citiesWithAirports[cityKey].airports.push({
    name: airport.name,
    iata: airport.iata || null,
    latitude: airport.lat,
    longitude: airport.lon
  });
}

// 🔹 Convertir en array pour MongoDB
const citiesArray = Object.values(citiesWithAirports);

// 🔹 Sauvegarder dans un fichier JSON prêt à seed
fs.writeFileSync("data/cities_airports.json", JSON.stringify(citiesArray, null, 2));

console.log("✅ cities_airports.json créé avec toutes les villes et leurs aéroports !");
