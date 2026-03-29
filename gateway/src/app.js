require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const helmet   = require("helmet");
const morgan   = require("morgan");

const strategyRoutes = require("./routes/strategy");
const backtestRoutes = require("./routes/backtest");
const dataRoutes     = require("./routes/data");
const authRoutes     = require("./routes/auth");
const errorHandler   = require("./middleware/errorHandler");

const app  = express();
const PORT = process.env.PORT || 3001;

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());
app.use(morgan("dev"));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth",     authRoutes);
app.use("/api/strategy", strategyRoutes);
app.use("/api/backtest", backtestRoutes);
app.use("/api/data",     dataRoutes);

app.get("/health", (_, res) => res.json({ status: "ok", service: "quantinel-gateway" }));

// ─── Error Handler (must be last) ────────────────────────────────────────────
app.use(errorHandler);

app.listen(PORT, () => console.log(`Gateway running on :${PORT}`));

module.exports = app;
