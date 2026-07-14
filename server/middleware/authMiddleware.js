import jwt from "jsonwebtoken";
import { getUserById } from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Missing token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await getUserById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    // Invalid token
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    // Expired token
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    next(error);
  }
};

export default authMiddleware;