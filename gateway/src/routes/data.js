const express = require("express");
const axios   = require("axios");
const router  = express.Router();
const ENGINE  = process.env.ENGINE_URL || "http://localhost:8000";

// GET /api/data/ohlcv?symbol=BTC/USDT&timeframe=1h&start_date=2024-01-01&end_date=2024-12-31
router.get("/ohlcv", async (req, res, next) => {
  try {
    const { symbol = "BTC/USDT", timeframe = "1h", start_date, end_date } = req.query;
    const { data } = await axios.post(`${ENGINE}/api/data/ohlcv`, { symbol, timeframe, start_date, end_date });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
