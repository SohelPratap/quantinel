const express  = require("express");
const bcrypt   = require("bcryptjs");
const jwt      = require("jsonwebtoken");
const { z }    = require("zod");

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "devsecret";

// In-memory store for MVP — swap with PostgreSQL later
const users = new Map();

const RegisterSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(8),
});

// POST /api/auth/register
router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = RegisterSchema.parse(req.body);

    if (users.has(email)) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = { id: Date.now().toString(), email, hash };
    users.set(email, user);

    const token = jwt.sign({ id: user.id, email }, SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, user: { id: user.id, email } });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = RegisterSchema.parse(req.body);
    const user = users.get(email);

    if (!user || !(await bcrypt.compare(password, user.hash))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email }, SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, email } });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
