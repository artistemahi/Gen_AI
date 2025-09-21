// backend/middleware/verifyToken.js
import { authAdmin } from "../firebaseadmin.js";

export const verifyToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = await authAdmin.verifyIdToken(token);
    req.user = decoded; // contains uid, email, etc.
    next();
  } catch (err) {
    console.error("verifyToken error", err.message);
    res.status(403).json({ message: "Invalid token" });
  }
};
