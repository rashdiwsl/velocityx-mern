import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});

export default mongoose.model("Car", carSchema);