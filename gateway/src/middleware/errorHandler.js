const { ZodError } = require("zod");

module.exports = (err, req, res, next) => {
  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({ error: "Validation failed", details: err.errors });
  }

  // Axios errors from engine calls
  if (err.response) {
    return res.status(err.response.status).json({
      error: err.response.data?.detail || "Engine error",
    });
  }

  console.error("[Gateway Error]", err.message);
  res.status(500).json({ error: "Internal server error" });
};
