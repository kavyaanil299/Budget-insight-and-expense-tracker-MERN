import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    
    req.user = {
      id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    };

    next();
  } catch (err) {
    console.log("AUTH ERROR:", err.message);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};