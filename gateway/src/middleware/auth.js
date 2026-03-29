const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "devsecret";

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }
  try {
    req.user = jwt.verify(header.slice(7), SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Token expired or invalid" });
  }
};
