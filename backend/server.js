import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// DB connect
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("VelocityX API Running");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));