import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 120_000,
});

// Attach JWT if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("qn_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Strategy ─────────────────────────────────────────────────
export const parseStrategy = (prompt, symbol) =>
  api.post("/strategy/parse", { prompt, symbol }).then((r) => r.data);

// ─── Backtest ─────────────────────────────────────────────────
export const runBacktest = (payload) =>
  api.post("/backtest/run", payload).then((r) => r.data);

// ─── Data ─────────────────────────────────────────────────────
export const fetchOHLCV = (params) =>
  api.get("/data/ohlcv", { params }).then((r) => r.data);

// ─── Auth ─────────────────────────────────────────────────────
export const login    = (email, password) =>
  api.post("/auth/login",    { email, password }).then((r) => r.data);
export const register = (email, password) =>
  api.post("/auth/register", { email, password }).then((r) => r.data);

export default api;
