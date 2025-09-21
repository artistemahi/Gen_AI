// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

app.get("/", (req, res) => res.send("Backend running ✅"));

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
