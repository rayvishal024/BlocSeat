import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import seatRoutes from "./routes/seat.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// middleware 
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// routes 
app.use("/api/auth", authRoutes);
app.use("/api/seats", seatRoutes);

// default routes
app.get("/", (req, res) => {
     res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(port, () => {
     console.log(`Server running on ${port}`);
});