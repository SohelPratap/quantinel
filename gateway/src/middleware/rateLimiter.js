const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 60 * 1000,       // 1 minute window
  max: 20,                   // 20 requests per user per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests — please slow down." },
});
