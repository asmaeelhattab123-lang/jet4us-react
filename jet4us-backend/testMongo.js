import mongoose from "mongoose";
import dotenv from "dotenv";
import Location from "./src/models/Location.model.js"; // ton modèle

dotenv.config();

async function checkDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // 1️⃣ Affiche toutes les villes
    const cities = await Location.find({ type: "city" }).lean();
    console.log("🏙️ Cities in DB:");
    cities.forEach(c => console.log(`${c.name} (${c.country})`));

    // 2️⃣ Affiche les aéroports pour Rabat, Paris et Abu Dhabi
    const airports = await Location.find({
      type: "airport",
      "city.name": { $in: ["Rabat", "Paris", "Abu Dhabi"] }
    }).lean();

    console.log("\n✈️ Airports for Rabat, Paris, Abu Dhabi:");
    airports.forEach(a =>
      console.log(`${a.name} (${a.iata || "no IATA"}) in ${a.city.name}`)
    );

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ MongoDB error:", err);
  }
}

checkDB();
