import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Location from "./src/models/Location.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection failed:", err));

const dataPath = path.join("data", "cities_airports.json");
const cities = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

async function seed() {
  try {
    await Location.deleteMany({});
    console.log("🗑️ Anciennes données supprimées");

    const insertData = [];

    cities.forEach(city => {
      // Ajouter la ville
      insertData.push({
        type: "city",
        name: city.city,
        country: city.country
      });

      // Ajouter les aéroports
      city.airports.forEach(airport => {
        insertData.push({
          type: "airport",
          name: airport.name,
          iata: airport.iata,
          latitude: airport.latitude,
          longitude: airport.longitude,
          city: { name: city.city, country: city.country }
        });
      });
    });

    await Location.insertMany(insertData);
    console.log(`✅ ${insertData.length} documents insérés`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
