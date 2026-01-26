// src/routes/airport.routes.js
import express from "express";
import Location from "../models/Location.model.js";

const router = express.Router();

// GET /api/airports?query=Abu Dhabi
router.get("/", async (req, res) => {
  try {
    const query = req.query.query || "";

    // Chercher tous les aéroports qui matchent le nom de la ville, le nom de l'aéroport ou l'IATA
    const airports = await Location.find({
      type: "airport",
      $or: [
        { "city.name": { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
        { iata: { $regex: query, $options: "i" } }
      ]
    })
      .limit(1000)
      .lean();

    // Grouper par ville
    const grouped = {};
    airports.forEach(a => {
      const cityName = a.city?.name || a.name || "Unknown";
      const cityCountry = a.city?.country || a.country || "XX";
      const key = `${cityName}_${cityCountry}`;

      if (!grouped[key]) {
        grouped[key] = {
          city: { name: cityName, country: cityCountry },
          airports: []
        };
      }

      grouped[key].airports.push({
        _id: a._id,
        name: a.name,
        iata: a.iata || "",
        country: a.country
      });
    });

    res.json(Object.values(grouped));
  } catch (err) {
    console.error("❌ Airport route error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
