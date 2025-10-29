
import { Router, Request } from "express";
import jwt from "jsonwebtoken";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

router.post("/api/login", (req: Request, res) => {
  const { email, password } = req.body;

  if (email === "Alpha" && password === "Mickey@2025") {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

export default router;
