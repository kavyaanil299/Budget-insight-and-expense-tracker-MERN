import User from "../models/User.js";
export const adminOnly = (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ msg: "Admin only" });
    }

    next();
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};