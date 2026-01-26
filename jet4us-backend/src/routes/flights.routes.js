import express from "express";
import Flight from "../models/Flight.model.js";

const router = express.Router();

// 🔹 GET all flights
router.get("/", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});

// 🔹 POST a new flight
router.post("/", async (req, res) => {
  try {
    const newFlight = new Flight(req.body);
    await newFlight.save();
    res.status(201).json(newFlight);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save flight" });
  }
});

export default router;
