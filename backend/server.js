import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import carRoutes from "./routes/carRoutes.js";
import garageRoutes from "./routes/garageRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("VelocityX API Running");
});

app.use("/api/cars", carRoutes);
app.use("/api/garage", garageRoutes);

app.use("/api/auth", authRoutes);
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));