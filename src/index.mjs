import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import seatRoutes from "./routes/seat.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// middleware 
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// routes 
app.use("/api/auth", authRoutes);
app.use("/api/seats", seatRoutes);

app.listen(port, () => {
     console.log(`Server running on ${port}`);
});