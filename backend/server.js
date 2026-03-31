import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import carRoutes from "./routes/carRoutes.js";
import garageRoutes from "./routes/garageRoutes.js";

const app = express();

// Enable JSON parsing
app.use(express.json());

// CORS middleware must come before routes
app.use(cors({
  origin: "http://localhost:3000", // React dev server
}));

// Routes
app.use("/api/garage", garageRoutes);
app.use("/api/cars", carRoutes);

// DB connect
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("VelocityX API Running");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));