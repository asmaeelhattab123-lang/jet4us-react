import express from "express";
import Location from "../models/Location.model.js";

const router = express.Router();

// 🔹 GET /api/locations?query=...
// Récupère les villes qui correspondent au query (autocomplete)
router.get("/", async (req, res) => {
  try {
    const query = req.query.query || "";

    // Filtre : type city et country connu
    const cityFilter = { type: "city", country: { $ne: "XX" } };
    if (query) {
     const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
     cityFilter.name = { $regex: `^${safeQuery}`, $options: "i" };
    }

    const cities = await Location.find(cityFilter)
      .limit(50) // limite pour autocomplete
      .select("name country latitude longitude")
      .lean();

    res.json(cities);
  } catch (err) {
    console.error("❌ /locations error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 GET /api/locations/airports?city=...&country=...
// Récupère tous les aéroports d'une ville
router.get("/airports", async (req, res) => {
  try {
    const { city, country } = req.query;
    if (!city || !country) return res.json([]);

    // Cherche tous les aéroports liés à cette ville
    const airports = await Location.find({
      type: "airport",
      "city.name": city,
      "city.country": country
    })
      .select("name iata latitude longitude")
      .lean();

    res.json(airports);
  } catch (err) {
    console.error("❌ /locations/airports error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
