import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

// ================= SIGNUP =================
export const signup = async (req, res) => {
  try {
    console.log("SIGNUP BODY:", req.body);

    const { name, email, password } = req.body;

    // VALIDATION
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        msg: "Password must be at least 6 characters",
      });
    }

    // CHECK USER
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // HASH PASSWORD
    const hashed = await bcrypt.hash(password, 10);

    // SAVE USER
    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    // SEND EMAIL (WELCOME)
    await sendEmail(
      email,
      "Welcome to SmartSpend 🎉",
      `Hello ${name}, your account has been created successfully!`
    );

    //  TOKEN 
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // RESPONSE
    res.status(201).json({
      msg: "User registered successfully ✅",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.log("SIGNUP ERROR:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    // VALIDATION
    if (!email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // FIND USER
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    // CHECK PASSWORD
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // TOKEN
    const token = jwt.sign(
  {
    id: user._id,
    email: user.email   
  },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
    //  SEND EMAIL (LOGIN ALERT )
    await sendEmail(
      user.email,
      "Login Alert ",
      `Hello ${user.name}, you have successfully logged in to SmartSpend.`
    );

    //  RESPONSE
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};