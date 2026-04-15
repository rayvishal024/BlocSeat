import express from "express";
import { getSeats, bookSeat } from "../controllers/seat.controller.js";
import isLoggedIn from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getSeats);
router.put("/book/:id", isLoggedIn, bookSeat);

export default router;