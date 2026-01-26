import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import airportRoutes from "./routes/airport.routes.js";
import locationRoutes from "./routes/Location.routes.js";
import flightRoutes from "./routes/flights.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5050;

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🚀 MongoDB Atlas connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => res.send("Jet4us API is running 🚀"));
app.use("/api/airports", airportRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/flights", flightRoutes);

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
