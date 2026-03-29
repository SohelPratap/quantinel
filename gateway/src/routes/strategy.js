const express = require("express");
const axios   = require("axios");
const { z }   = require("zod");
const rateLimiter = require("../middleware/rateLimiter");

const router = express.Router();
const ENGINE = process.env.ENGINE_URL || "http://localhost:8000";

const ParseSchema = z.object({
  prompt: z.string().min(5).max(1000),
  symbol: z.string().optional(),
});

// POST /api/strategy/parse
router.post("/parse", rateLimiter, async (req, res, next) => {
  try {
    const body = ParseSchema.parse(req.body);
    const { data } = await axios.post(`${ENGINE}/api/strategy/parse`, body, { timeout: 30_000 });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
