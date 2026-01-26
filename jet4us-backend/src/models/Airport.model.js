import mongoose from "mongoose";

const AirportSchema = new mongoose.Schema({
  geonameId: { type: Number, unique: true, index: true },
  name: { type: String, index: true },
  asciiName: String,
  alternateNames: [String],
  country: { type: String, index: true },
  iata: { type: String, index: true, sparse: true },
  location: {
  type: { type: String, enum: ["Point"], default: "Point" },
  coordinates: [Number] // [lng, lat]
  }
});

AirportSchema.index({ location: "2dsphere" });

export default mongoose.model("Airport", AirportSchema);
