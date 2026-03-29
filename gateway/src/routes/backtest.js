const express = require("express");
const { z }   = require("zod");
const axios   = require("axios");
const { addBacktestJob } = require("../services/queueService");
const auth    = require("../middleware/auth");
const rateLimiter = require("../middleware/rateLimiter");

const router  = express.Router();
const ENGINE  = process.env.ENGINE_URL || "http://localhost:8000";

const BacktestSchema = z.object({
  symbol:           z.string().default("BTC/USDT"),
  timeframe:        z.enum(["1m","5m","15m","1h","4h","1d"]).default("1h"),
  start_date:       z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  end_date:         z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  initial_capital:  z.number().positive().default(10000),
  strategy_rules:   z.object({}).passthrough(),
});

// POST /api/backtest/run  — synchronous (direct engine call for MVP)
router.post("/run", rateLimiter, async (req, res, next) => {
  try {
    const body = BacktestSchema.parse(req.body);
    const { data } = await axios.post(`${ENGINE}/api/backtest/run`, body, { timeout: 120_000 });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// POST /api/backtest/queue  — async via BullMQ (for heavy jobs)
router.post("/queue", auth, rateLimiter, async (req, res, next) => {
  try {
    const body  = BacktestSchema.parse(req.body);
    const jobId = await addBacktestJob(body);
    res.json({ success: true, jobId });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
