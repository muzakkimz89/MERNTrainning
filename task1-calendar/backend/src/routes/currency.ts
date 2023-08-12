import { addCurrency, deleteCurrency, getCurrency } from "../controllers/CurrencyController";
import express from "express";
const router = express.Router();

router.get("/", getCurrency);
router.post("/", addCurrency);
router.delete("/", deleteCurrency);

export default router;