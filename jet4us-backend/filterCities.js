// filterCities.js
import fs from "fs";
import path from "path";

// 🔹 chemins corrects
const inputPath = path.join("data", "cities15000.json");          // chemin vers le JSON original
const outputPath = path.join("data", "worldCities_filtered.json"); // chemin du JSON filtré

// 🔹 lire toutes les villes
const cities = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

// 🔹 garder seulement les villes importantes (population >= 100 000)
const filteredCities = cities
  .filter(city => city.population && city.population >= 100000)
  .sort((a, b) => b.population - a.population);

// 🔹 sauvegarder le résultat
fs.writeFileSync(outputPath, JSON.stringify(filteredCities, null, 2));

console.log(`✅ ${filteredCities.length} villes retenues`);
