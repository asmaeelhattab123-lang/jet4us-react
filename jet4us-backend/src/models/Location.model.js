import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String },
  type: { type: String, enum: ["city", "airport"], required: true },
  iata: { type: String },
  city: {
    name: { type: String },
    country: { type: String }
  }
});

const Location = mongoose.model("Location", locationSchema);
export default Location;
