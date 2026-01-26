import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  fromCity: { type: String, required: true },
  toCity: { type: String, required: true },
  date: { type: String, required: true },
  fromTime: { type: String, required: true },
  toTime: { type: String, required: true },
  tripType: { type: String, required: true },
  jet: { type: String, required: true },
  seats: { type: Number, required: true },
  price: { type: String, required: true },
  company: { type: String, required: true },
  status: { type: String, required: true }, // ex: private
  type: { type: String, required: true },   // ex: One way, Round trip
  image: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Flight", flightSchema);
