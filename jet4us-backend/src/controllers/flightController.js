// backend/controllers/flightController.js
import Flight from "../models/Flight.model.js";

// Créer un vol
export const createFlight = async (req, res) => {
  try {
    const { userId, fromCity, toCity, fromTime, toTime, date, tripType, jet, seats, price, company } = req.body;

    if (!userId || !fromCity || !toCity || !date || !fromTime || !toTime) {
      return res.status(400).json({ message: "Please fill all required fields!" });
    }

    const newFlight = new Flight({
      userId, fromCity, toCity, fromTime, toTime, date, tripType, jet, seats, price, company
    });

    await newFlight.save();
    return res.status(201).json(newFlight);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Récupérer tous les vols d’un utilisateur
export const getUserFlights = async (req, res) => {
  try {
    const { userId } = req.params;
    const flights = await Flight.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json(flights);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
